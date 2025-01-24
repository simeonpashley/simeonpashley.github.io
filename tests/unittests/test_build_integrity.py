import os
import hashlib
import pytest
from typing import Dict, List
import requests
from subprocess import run, PIPE

@pytest.fixture
def site_files() -> List[str]:
    """List of critical site files that must exist after build"""
    return [
        os.path.join("_site", "index.html"),
        os.path.join("_site", "assets", "css", "main.css"),
        os.path.join("_site", "assets", "js", "main.js"),
        os.path.join("_site", "404.html"),
        os.path.join("_site", "robots.txt"),
        os.path.join("_site", "sitemap.xml")
    ]

@pytest.fixture
def expected_checksums() -> Dict[str, str]:
    """Expected SHA-256 checksums for critical files"""
    return {
        os.path.join("_site", "index.html"): "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",  # Empty file hash
        os.path.join("_site", "assets", "css", "main.css"): "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        os.path.join("_site", "assets", "js", "main.js"): "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    }

@pytest.fixture
def required_security_headers() -> Dict[str, str]:
    """Required security headers for HTML responses"""
    return {
        "Content-Security-Policy": "default-src 'self'",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    }

def test_build_integrity(site_files: List[str]) -> None:
    """Verify critical site files exist after build"""
    for file_path in site_files:
        assert os.path.exists(file_path), f"Missing critical file: {file_path}"

def test_file_integrity(site_files: List[str], expected_checksums: Dict[str, str]) -> None:
    """Verify file content integrity using checksums"""
    for file_path in site_files:
        if file_path in expected_checksums:
            with open(file_path, "rb") as f:
                file_hash = hashlib.sha256(f.read()).hexdigest()
                assert file_hash == expected_checksums[file_path], \
                    f"Checksum mismatch for {file_path}"

def test_security_headers(required_security_headers: Dict[str, str]) -> None:
    """Verify presence of basic security headers"""
    # Start Jekyll server if not already running
    response = requests.get("http://localhost:4000")

    # Verify all required headers are present
    for header, expected_value in required_security_headers.items():
        assert header in response.headers, f"Missing security header: {header}"
        assert response.headers[header] == expected_value, \
            f"Invalid value for {header}: {response.headers[header]}"

def test_linting() -> None:
    """Verify all test files pass linting"""
    # Run project linting tools
    rubocop_result = run(["bundle", "exec", "rubocop"], stdout=PIPE, stderr=PIPE)
    npm_lint_result = run(["npm", "run", "lint"], stdout=PIPE, stderr=PIPE)

    # Verify both linting commands succeeded
    assert rubocop_result.returncode == 0, \
        f"Rubocop linting failed:\n{rubocop_result.stderr.decode()}"
    assert npm_lint_result.returncode == 0, \
        f"NPM linting failed:\n{npm_lint_result.stderr.decode()}"

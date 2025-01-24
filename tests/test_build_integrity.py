import os

import pytest


@pytest.fixture
def site_files():
    return ["_site/index.html", "_site/assets/css/main.css", "_site/assets/js/main.js"]


def test_build_integrity(site_files):
    """Verify critical site files exist after build"""
    for file_path in site_files:
        assert os.path.exists(file_path), f"Missing critical file: {file_path}"

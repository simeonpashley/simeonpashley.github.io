import math
from xml.etree.ElementTree import Element, SubElement, tostring
import xml.dom.minidom

# Helper function to calculate positions of inner circles on the clock face
def calculate_positions(cx, cy, radius, count):
    positions = []
    for i in range(count):
        # Start at 12 o'clock and move clockwise
        angle = -math.pi / 2 + 2 * math.pi * i / count
        x = cx + radius * math.cos(angle)
        y = cy + radius * math.sin(angle)
        positions.append((x, y))
    return positions

# Colours for the circles in order
circle_colours = ["#2563EB", "#F59E0B", "#10B981", "#9333EA"]

# Outer radius for the circle arrangement
outer_radius = 40  # Distance from the centre of the outer circle to its inner circles
# Radius for the inner circles
inner_radius = 8
offset_x = 100
offset_y = 100

# Define variants for outer_positions, omissions, and gap
variants = {
    "horizontal": {
        "outer_positions": [
            (((2 * outer_radius + 0) * i + outer_radius) + (inner_radius), (outer_radius + (inner_radius)))  # Dynamic X-coordinate
            for i in range(4)
        ],
        "omissions": [
            [3, 4],       # Circle 1
            [2, 3, 10],   # Circle 2
            [3, 4, 8],    # Circle 3
            [10]          # Circle 4
        ],
        "gap": 0
    },
    "vertical": {
        "outer_positions": [
            ( (outer_radius + (inner_radius)), ((2 * outer_radius + 0) * i + outer_radius) + inner_radius)  # Dynamic Y-coordinate
            for i in range(4)
        ],
        "omissions": [
            [6,7],       # Circle 1 - BLUE
            [1, 5,6],   # Circle 2 - ORANGE
            [11,6,7],    # Circle 3 - GREEN
            [1]          # Circle 4 - PURPLE
        ],        # Placeholder for vertical omissions
        "gap": 0
    },
    "square": {
        "outer_positions": [
            ((2 * outer_radius + inner_radius) * (i % 2) + outer_radius + inner_radius - (inner_radius if i % 2 == 1 else 0),
             (2 * outer_radius + inner_radius) * (i // 2) + outer_radius + inner_radius - (inner_radius if i // 2 == 1 else 0))
            for i in range(4)
        ],
        "omissions": [
            [3,5, 7],       # Circle 1 - BLUE
            [10, 6, 8],   # Circle 2 - ORANGE
            [12, 2,4],    # Circle 3 - GREEN
            [9, 11, 1]          # Circle 4 - PURPLE
        ],        # Placeholder for square omissions
        "gap": 0
    }
}

def make_logo(variant_name, output_path):
    # Select the variant
    selected_variant = variants[variant_name]

    # Use the selected variant
    outer_positions = selected_variant["outer_positions"]
    omissions = selected_variant["omissions"]

    # Calculate bounding box dimensions
    min_x = min(pos[0] for pos in outer_positions) - (outer_radius + inner_radius*2 )
    max_x = max(pos[0] for pos in outer_positions) + (outer_radius + inner_radius*2)
    min_y = min(pos[1] for pos in outer_positions) - (outer_radius + inner_radius*2)
    max_y = max(pos[1] for pos in outer_positions) + (outer_radius + inner_radius*2)

    # Define SVG with dynamic width and height
    svg_width = max_x - min_x
    svg_height = max_y - min_y
    svg = Element('svg', width=str(svg_width), height=str(svg_height), viewBox=f"0 0 {svg_width} {svg_height}", xmlns="http://www.w3.org/2000/svg")

    # Draw the circles
    for i, (cx, cy) in enumerate(outer_positions):
        # Compute positions of inner circles
        inner_positions = calculate_positions(cx, cy, outer_radius, 12)
        for j, (ix, iy) in enumerate(inner_positions):
            # Correct numbering: 12 at the top, then clockwise
            clock_number = (j + 11) % 12 + 1
            # Only draw if this inner circle is not omitted
            if not omissions or clock_number not in omissions[i]:
                SubElement(svg, 'circle', cx=str(ix), cy=str(iy), r=str(inner_radius), fill=circle_colours[i])

    # Prettify and export SVG as a string
    svg_string = xml.dom.minidom.parseString(tostring(svg)).toprettyxml()

    # Save the SVG to a file
    with open(output_path, "w") as file:
        file.write(svg_string)

    print(f"SVG logo with {variant_name} positions saved as '{output_path}'")

# Callable examples to generate all logos
make_logo("square", "logo_s.svg")
make_logo("vertical", "logo_v.svg")
make_logo("horizontal", "logo_h.svg")

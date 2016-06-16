# Generate Image Placeholder

A cli tool which generates a json with base64 placeholders for a given set of images.

The tool resizes each image to a given size and transforms it into a base64 string which later on can be used as value for the `src` attribute of an `img` element until the full image is being loaded.

## Installation

`npm install -g gen-img-placeholder`

## Usage

`gen-img-placeholder [options] <images glob pattern>`

Options:

* _-h, --help_ - output usage information
* _-V, --version_ - output the version number
* _-s, --size_ - New size for the placeholder, in percentage (default: 1%)
* _-o, --output_ - Path for the output json (default: stdout)

### Example

`gen-img-placeholder -s 1 -o './placeholders.json' 'assets/**/*.png'`
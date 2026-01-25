# Changelog

All notable changes to Ghost TOC will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.3.0] - 2026-01-25

### Added
- **default-state attribute**: Control initial state of collapsible TOC (collapsed/expanded)
- **levels attribute**: Filter which heading levels to include in TOC (e.g., `levels="2,3"`)
- **class attribute**: Add custom CSS classes to TOC container for styling
- **remember-state attribute**: Persist TOC state in localStorage across page loads
- **list-style attribute**: Choose list marker style (bullets/numbers/none)
- **exclude attribute**: Skip specific headings by ID (e.g., `exclude="heading-1,heading-2"`)
- Comprehensive JSDoc documentation for all methods
- Constants for default values and mappings (STORAGE_KEY, DEFAULTS, LIST_STYLE_MAP, STATE)

### Changed
- Refactored code into smaller, focused methods for better maintainability
- Extracted 13 new methods from complex blocks:
  - Configuration: `readAttributes()`
  - Styling: `getBaseStyles()`, `getCollapsibleStyles()`, `getListStyles()`, `getListStyleType()`
  - Toggle: `expandTable()`, `collapseTable()`, `saveState()`, `applyButtonStyles()`
  - Navigation: `setupCollapsibleNavigation()`, `getInitialState()`
  - Structure: `getFilteredHeadings()`, `shouldIncludeHeading()`, `addNodeToTree()`
- Improved code readability with consistent spacing and formatting
- All if statements now use braces consistently

### Improved
- Better code organization with single-responsibility methods
- Enhanced maintainability and testability
- Clearer intent with descriptive method names
- DRY principle applied with constants

## [2.2.0] - 2026-01-25

### Fixed
- Fixed duplicate h3 in heading selector (prepareStructure method)
- Added null check to prevent crash when no article tag exists
- Fixed CSS selector from ID to class for toc-container
- Added validation to skip headings without ID attributes

### Changed
- Replaced anchor tag with button element for toggle control (improved semantics)
- Added comprehensive ARIA attributes for screen reader support
  - aria-expanded on toggle button
  - aria-controls linking button to navigation
  - aria-label describing button purpose
- Added try-catch block for better error handling
- Styled toggle button to look like plain text instead of default button appearance

### Improved
- Better accessibility for screen reader users
- More helpful console warnings for debugging
- Graceful degradation on pages without proper structure

## [2.1.1] - 2026-01-23

### Added
- Automated build system using Terser for minification
- Build scripts for generating distribution file
- BUILD.md with detailed build instructions
- npm scripts: `build`, `clean`
- Full customization example demonstrating all configuration options
- GitHub Actions workflows for automated builds and releases
  - Auto Build: Automatically builds and commits minified file on push to main
  - Release: Automatically attaches minified file to GitHub releases
- Links to Ghost snippets documentation
- Comprehensive project origin story in README

### Changed
- Enhanced documentation noting compatibility with any webpage (not just Ghost)
- Updated package.json with comprehensive keywords and description
- Improved README with development and build instructions
- Reorganized README structure for better first impression
- Combined License and Author sections into "License & Credits"
- Added GitHub repository link to minified file header

## [2.1.0] - 2024

### Added
- Collapsible functionality with show/hide toggle
- Custom styling options (border-color, bg-color)
- Configurable show/hide button text
- Proper project structure with dedicated GitHub repository
- Comprehensive documentation and examples
- Installation guide
- Example HTML files demonstrating usage

### Changed
- Improved code organization with better comments
- Enhanced documentation in README
- Better attribute handling for configuration options

### Fixed
- Better filtering of Ghost's author name heading

## [1.0.0] - Initial Release

### Added
- Basic table of contents generation from article headings
- Support for H2-H6 heading levels
- Hierarchical navigation structure
- Automatic anchor link generation
- Basic styling with centered title
- Custom TOC title support

---

## Historical References

Ghost TOC originated as GitHub Gists before moving to a dedicated repository:

- [v1.0 Gist](https://gist.github.com/vlavrynovych/4111095383229db74e71aedf72652fc9) - Initial release
- [v2.1 Gist](https://gist.github.com/vlavrynovych/3f244d0b7e9ea9a861d9427aa76486d1) - Added collapsible functionality

**Note**: The Gist versions are now archived. Please use this repository for the latest version and updates.
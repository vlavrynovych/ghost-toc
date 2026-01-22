# GitHub Actions Workflows

This directory contains automated workflows for building and releasing Ghost TOC.

## Workflows

### 1. Auto Build (`build.yml`)

**Triggers**: When changes are pushed to `main` branch in:
- `src/**` (source files)
- `scripts/**` (build scripts)
- `package.json`

**What it does**:
1. Checks out the repository
2. Installs dependencies
3. Runs the build process (`npm run build`)
4. Commits and pushes the updated `dist/ghost-toc.min.js` if it changed

**Benefits**: You only need to edit `src/ghost-toc.js` and push - the minified version is automatically updated.

### 2. Build and Release (`release.yml`)

**Triggers**: When a new GitHub release is created or published

**What it does**:
1. Checks out the repository
2. Installs dependencies
3. Runs the build process
4. Attaches the minified `ghost-toc.min.js` file to the release

**Benefits**: Users can download the minified file directly from the release assets.

## Development Workflow

### Daily Development
1. Edit `src/ghost-toc.js`
2. Test locally with `npm run build`
3. Commit and push changes
4. GitHub Actions automatically builds and commits `dist/ghost-toc.min.js`

### Creating a Release
1. Go to GitHub → Releases → "Draft a new release"
2. Create a new tag (e.g., `v2.2.0`)
3. Add release notes
4. Click "Publish release"
5. GitHub Actions automatically attaches the minified file

## Manual Build

If you need to build locally:

```bash
npm install
npm run build
```

## Troubleshooting

### Build workflow fails
- Check that `package.json` has all required dependencies
- Verify build script works locally
- Check GitHub Actions logs for specific errors

### Release workflow fails
- Ensure the release was properly created/published
- Check that `dist/ghost-toc.min.js` exists after build
- Verify GITHUB_TOKEN has proper permissions

## Disabling Workflows

To disable a workflow temporarily, edit the workflow file and change `on:` trigger or add a condition like:

```yaml
if: false  # Disable this workflow
```
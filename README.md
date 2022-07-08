<img src="https://user-images.githubusercontent.com/98138701/172487715-e5295204-778c-4253-8553-7ba1fa3cb147.png" width="450px" />

A Github action for deciding if a new version should be generated using configuration files from your project

[![Build](https://github.com/thiagodnf/new-version-decider/actions/workflows/release.yml/badge.svg)](https://github.com/thiagodnf/new-version-decider/actions/workflows/build.yml)
[![GitHub Release](https://img.shields.io/github/release/thiagodnf/new-version-decider.svg)](https://github.com/thiagodnf/new-version-decider/releases/latest)
[![GitHub contributors](https://img.shields.io/github/contributors/thiagodnf/new-version-decider.svg)](https://github.com/thiagodnf/new-version-decider/graphs/contributors)
[![GitHub stars](https://img.shields.io/github/stars/thiagodnf/new-version-decider.svg)](https://github.com/thiagodnf/new-version-decider)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

## Usage

You can now consume the action by referencing the available version.

```yaml
- uses: thiagodnf/new-version-decider@v0.0.9
  with:
    loader: nodejs
    configurationFile: ./package.json
```

```yaml
- name: Create Release on Github
  uses: softprops/action-gh-release@v1
  if: ${{steps.releaser.outputs.newVersion == 'true' }}
  with:
    name: ${{ steps.releaser.outputs.currentVersion }}
      tag_name: v${{steps.releaser.outputs.currentVersion}}
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Input

### `loader`

**Required** The type of the file

### `configurationFile`

**Required** The configuration file

## Outputs

### `id`

Latest release ID

### `latestRelease`

Latest release name

### `currentVersion`

Next release name

### `shouldGenerateANewVersion`

True if you need to generate a new version

## Loaders

This action supports the following loaders:

| Loader | Default Configuration File |
|----|----|
|nodejs | package.json |
|java-maven | pom.xml |

## Log

If you run this GitHub Actions, this is what the log information looks like:

```bash
Run thiagodnf/new-version-decider@main
id: 68836407
latestRelease: 0.0.6
currentVersion: 0.0.6
shouldGenerateANewVersion: false
```

## For Developers

Install the dependencies

```bash
npm install
```

Run the development enviroment

```bash
npm run dev
```

## Questions or Suggestions

Feel free to access the <a href="../../discussions">discussions tab</a> as you need

## Contribute

Contributions to the this project are very welcome! We can't do this alone! Feel free to fork this project, work on it and then make a pull request.

## License

Licensed under the [MIT license](LICENSE).

## Donate

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously, this takes time. You can integrate and use these projects in your applications for free! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, reach out to me if you want to do it.

Thanks!

❤️

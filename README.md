# Sublime-lucy

[![Netlify Status](https://api.netlify.com/api/v1/badges/7a300341-ccb2-46ca-9084-ded422667a16/deploy-status)](https://app.netlify.com/sites/sublime-lucy/deploys)

## About <a name = "about"></a>

A minimalistic project to generate uniqe working title for projects using the [@stackbit/artisanal-names](https://github.com/stackbithq/artisanal-names) lib.

## Usage <a name = "usage"></a>

Visit the [site](https://sublime-lucy.netlify.app/#) and pick a name on the clipboard

Or 

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/zsim0n/sublime-lucy)

## Installing <a name = "install"></a>

``` zsh
git clone...
cd sublime-lucy
yarn install
yarn start
```

and visit http://localhost:8080 or access the API http://localhost:9000

## CLI <a name = "cli"></a>

The project exposes a simple API, the API can be used to create a shell function. (inspired by [gitignore.io CLI](https://docs.gitignore.io/install/command-line)

**zsh**

``` zsh
echo "function sublime-lucy() { curl -sLw "\n" https://sublime-lucy.netlify.app/.netlify/functions/sublime-lucy ;}" >> \
~/.zshrc && source ~/.zshrc
```

#### Example <a name = "example"></a>
Creating a new project with help of sublime-lucy and [gitignore.io CLI - gi](https://docs.gitignore.io/install/command-line)

``` zsh
mkdir $(sublime-lucy)
cd $_
gi react,node,macOs,visualstudiocode > .gitignore
git init
git add .
git commit -am "Initial commit"
```

## Additional

The project itself a barebone blueprint for developing apps with react - Material UI and Netlify Functions (lamda) with webpack.

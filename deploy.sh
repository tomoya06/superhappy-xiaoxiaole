#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:tomoya06/tomoya06.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:tomoya06/superhappy-xiaoxiaole.git master:gh-pages

cd -

echo 'visit https://tomoya06.github.io/superhappy-xiaoxiaole/ for changes'

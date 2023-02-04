npm run build

cd dist
git init
git checkout -B master
git add -A
git commit -m "Deploy"
git push -f https://github.com/OrangeFalcon14/Nexion.git master:gh-pages
cd ..

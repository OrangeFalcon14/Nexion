npm run build

cp -R src/assets/fonts dist/src/assets/fonts
cp -R src/assets/icons dist/src/assets/icons
cp -R src/assets/wallpapers dist/src/assets/wallpapers
cp -R src/assets/sounds dist/src/assets/sounds
cp -R src/assets/Asteroids.html dist/src/assets/Asteroids.html

cd dist
git init
git checkout -B master
git add -A
git commit -m "Deploy"
git push -f https://github.com/OrangeFalcon14/Nexion.git master:gh-pages
cd ..

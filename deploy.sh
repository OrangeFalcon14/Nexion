cp -R src/assets/fonts dist/src/assets/fonts
cp -R src/assets/icons dist/src/assets/icons
cp -R src/assets/wallpapers dist/src/assets/wallpapers
cp -R src/assets/sounds dist/src/assets/sounds
cp -R src/assets/Asteroids.html dist/src/assets/Asteroids.html

/usr/bin/rm -r ../dist
cp -r dist ../dist
git checkout gh-pages
/usr/bin/rm -r src index.html
cp -r ../dist/src src
cp ../dist/index.html index.html

git add .
git commit -m "Adding dist"
git push origin gh-pages

git checkout svelte

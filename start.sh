rm -rf web/build
cd web
bun run build
cd ..

rm -rf build/
cp -r web/build/ ./build/

cross-env NODE_ENV=render nodemon --exec babel-node server.js --ignore public/
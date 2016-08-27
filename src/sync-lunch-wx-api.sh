forever stop /home/ubuntu/paul/lunch-wx-api/build_product/server.js

git -C  /home/ubuntu/paul/lunch-wx-api/ pull 

cd /home/ubuntu/paul/lunch-wx-api/
npm install
npm run build-prod

cd /home/ubuntu/paul/lunch-wx-api/build_product/
npm install

forever start /home/ubuntu/paul/lunch-wx-api/build_product/server.js
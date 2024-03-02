##Url shortener front-end

# Instructions

* Make sure you follow the instructions to run the backend first before starting the front-end (https://github.com/s-edlund/url-shortener-back)
* Have node/npm and Docker installed. The code was built using node v21.1.0 and Docker Desktop for Mac
* `npm install`
* `npm run build`
* `./build-docker.sh`
* `./run-docker.sh`
* Make sure the nginx container comes up okay (`docker logs  url-shortener-front`). If not, you might need to change the port in `run-docker.sh` to use a different host port than 80 (it might be taken up by a different service)
* Load up `http://localhost` in a browser. The React app should show up.


You can also run a local dev version of the app using `npm start dev`

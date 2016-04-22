# ![drawing](https://cloud.githubusercontent.com/assets/3071208/14738483/22967ed8-0882-11e6-874d-4c19eb244373.png)


This is a plugin based crossplatform social network manager application based on electron.


##Usage (Alpha)

**This project is still on development and is not ready for public use**

Current early use can be done by cloning repo
```
# Clone the repository
$ git clone https://github.com/Hatisoft/koteky.git
```

plugins need to be installed by hand adding them on the plugin section of package.json
```
{
  ...
  "plugins": 
  {
   "name_of_plugin" : "version_or_repo"
  }
}
```

execution can be achived by: 

```
# Go into the repository
$ cd koteky

# Install the dependencies and run
$ npm install && npm start
```

##Roadmap

- [x] Use plugin based architecture
- [x] Style and Display fake posts
- [x] Authentication based on Oauth for social networks
- [ ] Implement Twitter plugin
- [ ] Implement Facebook plugin
- [ ] Implement LinkedIn plugin
- [ ] Others

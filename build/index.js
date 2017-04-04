'use strict';

System.register(['https://cdn.rodin.io/v0.0.1/vendor/three/THREE.GLOBAL.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/RODIN.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/scene/SceneManager.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/sculpt/CubeObject.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/controllers/MouseController.js'], function (_export, _context) {
  "use strict";

  var THREE, RODIN, SceneManager, CubeObject, MouseController, scene, mouseController, loader, geometry, material, i, cube;
  return {
    setters: [function (_httpsCdnRodinIoV001VendorThreeTHREEGLOBALJs) {
      THREE = _httpsCdnRodinIoV001VendorThreeTHREEGLOBALJs.THREE;
    }, function (_httpsCdnRodinIoV001RodinjsRODINJs) {
      RODIN = _httpsCdnRodinIoV001RodinjsRODINJs;
    }, function (_httpsCdnRodinIoV001RodinjsSceneSceneManagerJs) {
      SceneManager = _httpsCdnRodinIoV001RodinjsSceneSceneManagerJs.SceneManager;
    }, function (_httpsCdnRodinIoV001RodinjsSculptCubeObjectJs) {
      CubeObject = _httpsCdnRodinIoV001RodinjsSculptCubeObjectJs.CubeObject;
    }, function (_httpsCdnRodinIoV001RodinjsControllersMouseControllerJs) {
      MouseController = _httpsCdnRodinIoV001RodinjsControllersMouseControllerJs.MouseController;
    }],
    execute: function () {
      scene = SceneManager.get();
      mouseController = new MouseController();

      SceneManager.addController(mouseController);

      loader = new THREE.TextureLoader();

      loader.load('img/boxW.png', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 10);

        var geometry = new THREE.BoxGeometry(10, 10, 10);
        var material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.BackSide
        });
        var skybox = new THREE.Mesh(geometry, material);
        skybox.position.y = 1.7;
        scene.add(skybox);
      });

      geometry = new THREE.BoxGeometry(0.015, 0.015, 0.015);
      material = new THREE.MeshNormalMaterial();


      for (i = 0; i < 1000; i++) {
        cube = new RODIN.THREEObject(new THREE.Mesh(geometry, material));


        cube.on('ready' /*RODIN.CONSTANTS.EVENT_NAMES.READY*/, function (evt) {
          evt.target.object3D.position.set(Math.randomFloatIn(-0.75, 0.75), scene.controls.userHeight - Math.randomFloatIn(-1.5, 1.5), Math.randomFloatIn(-0.75, 0.75));
          scene.add(evt.target.object3D);
          RODIN.Raycastables.push(evt.target.object3D);
        });

        cube.on('update' /*RODIN.CONSTANTS.EVENT_NAMES.UPDATE*/, function (evt) {
          evt.target.object3D.rotation.y += RODIN.Time.deltaTime() / 500;
        });
        cube.on(RODIN.CONSTANTS.EVENT_NAMES.CONTROLLER_HOVER, function (evt) {
          evt.target.object3D.scale.set(2, 2, 2);
        });
        cube.on(RODIN.CONSTANTS.EVENT_NAMES.CONTROLLER_HOVER_OUT, function (evt) {
          evt.target.object3D.scale.set(1, 1, 1);
        });
      }
    }
  };
});
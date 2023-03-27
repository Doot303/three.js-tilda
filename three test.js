//<canvas id="c"></canvas>  добавляется в zero блок в тильде

//все что после добавить в html блок

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r120/three.min.js"></script> //импорт библиотеки three.js
<script src="https://cdn.jsdelivr.net/gh/mrdoob/three.js@r92/examples/js/loaders/GLTFLoader.js"></script> //импорт библиотеки для работы с форматом gltf
<script>
    let scene, camera, render
    var mouseX = 0, mouseY = 0;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2; 

function init() {

    const canvas = document.querySelector('#c');
    scene = new THREE.Scene() //создание новой сцены
    scene.background = new THREE.Color(0xdddddd) //цвет бэкграунда

    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight,1,5000) //настройки камеры
    camera.rotation.y = 15/180*Math.PI
    camera.rotation.x = -10/180*Math.PI
    camera.position.x = -40
    camera.position.y = 500
    camera.position.z = -300



   hlight = new THREE.AmbientLight(0x404040, 4) //всенаправленный свет
    scene.add(hlight)

    directionalLight = new THREE.DirectionalLight(0xffffff, 1) //настройки тени
    directionalLight.position.set(0,1,0)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    light = new THREE.PointLight(0xc4c4c4, 0) //настройка направленного света, может быть несколько источников
    light.position.set(0, 300, 500)
    scene.add(light)

    

    renderer = new THREE.WebGLRenderer({canvas, antialias: true}) //настройки рендера

    renderer.setSize(window.innerWidth, window.innerHeight) 
    
    //controls = new THREE.OrbitControls(camera, renderer.domElement);
                document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );


				window.addEventListener( 'resize', onWindowResize, false );

    let loader = new THREE.GLTFLoader() //загрузка gltf файла
    loader.load('https://raw.githubusercontent.com/Doot303/nto2/main/scene.gltf', function(gltf){
        car = gltf.scene.children[0]
        car.scale.set(30, 30, 30)
        scene.add(gltf.scene)
        animate();

    })
}

//..................................................................
            function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

		// Параметры поведения модели при движении мышью

    function onDocumentMouseMove( event ) {

        mouseX = event.clientX - windowHalfX;

        mouseY = event.clientY - windowHalfY;

    }

    function onDocumentTouchStart( event ) {

        if ( event.touches.length === 1 ) {

            event.preventDefault();

            mouseX = event.touches[ 0 ].pageX - windowHalfX;

            mouseY = event.touches[ 0 ].pageY - windowHalfY;

        }

    }

    function onDocumentTouchMove( event ) {

        if ( event.touches.length === 1 ) {

            event.preventDefault();

            mouseX = event.touches[ 0 ].pageX - windowHalfX;

            mouseY = event.touches[ 0 ].pageY - windowHalfY;

        }

    }


//настройки анмации
function animate() {

        camera.position.x += ( mouseX - camera.position.x ) * .005;

        camera.position.y += ( - mouseY - camera.position.y ) * .005;

        camera.lookAt( 0, 0, 0 );

        renderer.render(scene,camera);

        requestAnimationFrame(animate);

    }

init()
</script>
# three.js example

three.js example in wechat miniprogram

----

three.js 在小程序里的使用示例，其中 [three.js](https://github.com/yannliao/three.js) 使用的是小程序移植版，详情请到 [https://github.com/yannliao/three.js](https://github.com/yannliao/three.js)。

## 示例
* 基本。 包含 `BoxBufferGeometry`, `CircleBufferGeometry`, `ConeBufferGeometry`, `CylinderBufferGeometry`, `DodecahedronBufferGeometry` 等基本模型使用。
* OrbitControl 立方。 使用oribitControl控制立方体。
* gLTF。 加载gltf格式模型。
* OBJ。 加载obj格式模型。

## 注意 
由于示例中有较多的模型是使用官网链接，加载比较慢。如果可以请查找替换资源路径，并替换。

## 兼容性

<font color=green> xiaomi MIX2 Android 8.0.0   Wechat Version 7.0.5   ok </font>

<font color=green> vivo X21A Android 9  Wechat Version 7.0.5    ok </font>

<font color=red> iphone 8Plus  ios13.1.2  Wechat Version 7.0.8    new gLTF 白屏 </font>
    
## 演示

1. 基本

<img src="./demo/Screenshot_2019-10-22-11-03-47-236_com.tencent.mm.png"  width="120">

2. OrbitControl 立方

<img src="./demo/Screenshot_2019-10-22-11-04-02-587_com.tencent.mm.png"  width="120">

3. gLTF 文件加载

<img src="./demo/Screenshot_2019-10-22-11-04-32-720_com.tencent.mm.png"  width="120">

glb 文件 

<img src="./demo/Screenshot_2019-10-24-10-43-43-123_com.tencent.mm.png"  width="120">

gLTF 文件加贴图

<img src="./demo/Screenshot_2019-10-22-11-03-37-095_com.tencent.mm.png"  width="120">

<img src="./demo/Screenshot_2019-10-22-11-01-18-748_com.tencent.mm.png"  width="120">

4. obj 文件 （WEBGL_compressed_texture_s3tc 扩展不支持）

<img src="./demo/Screenshot_2019-10-22-11-05-48-148_com.tencent.mm.png"  width="120">


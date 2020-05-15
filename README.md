## 游戏实现思路总结：

### 地图映射
使用模板字符串编辑游戏地图，并赋予相应字符串的相应意义。

### 建立直角坐标系
读取地图，建立直角坐标系，储存地图元素以及游戏角色。

### 渲染元素（器）
按照固定比例*单位尺寸进行大小调整。

### 定义向量（简单实现）
每个元素具备x,y属性，对应于它的坐标位置。并提供了向量相加，向量乘以倍数方法。

### 角色登场
为每种角色赋予其所需属性，例如：位置（向量），速度（向量）等。

### 添加事件监听器
本实例的事件不仅仅监听按下的动作，还需要人性化地支持长按动作。长按的实现思路：
创建一个对象用以存储各个按键处于的状态（keydown/keyup），具体的事件处理交给具体的对象去处理，
本实例的做法是为每个角色实现update方法，用以更新角色位置。

### 运行游戏
#### 支持多张地图（多个关卡）
利用async/await特性，当前关卡完成即跳入下一个关卡。
#### 游戏主循环
采用requestAnimationFrame作为游戏主循环，时间间隔是当前时刻-上次时刻（最低不低于100ms），然后游戏中的角色可以根据这个时间间隔去做相应的匀速运动（只要确认速度即可）。
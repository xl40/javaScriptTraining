/**
 * 4. 将89小时，转换成x天零y小时
 * 5. 自增和自减的练习题（同桌之间互测）
 * 6. 玫瑰班有56名小朋友，开学大扫除，有23名小朋友参与。向日葵班有41人，请问应出多少人，才能和玫瑰班的比例大致相同（忽略小数点）
 * 7. 活用变量和各种运算及打印语句，要的是代码和表达式，不是结果
 */

describe("Statement", () => {
    it('1. 玫瑰班有56名小朋友，其中男生占比23%，请问女生有多少人', function () {
        var roseClass = 56;
        var boyStudent = Math.floor(roseClass * 0.23);
        var girlStudent = roseClass - boyStudent;
        console.log("女生有 " + girlStudent + " 人");
    });

    it('2. 设有一个圆，半径为80，求面积和周长。 - 设π为3.14', function () {
        var r = 80;
        var pai = 3.14;
        var area = pai * r * r;
        var circumference = Math.round(2 * pai * r);
        console.log("面积为: " + area + ", 周长为:" + circumference);
    });

    it('3. 将90度的角度转为弧度. ', function () {
        var pai = 3.13
        var angle = 90;
        var radian = angle * (pai / 180);
        console.log("角度为: " + angle + ", 转弧度为:" + radian);
    });

})
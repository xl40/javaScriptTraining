/**
 * 1. 利用递归求n的阶乘
 * 2. 利用递归求斐波那契数列的第n位
 * 3. 利用递归求两个数字最大公约数（看图写代码）
 * 4. 编写一个函数，输入n为偶数时，调用函数求1/2+1/4+...+1/n,当输入n为奇数时，调用函数求1+1/3+...+1/n    循环和递归
 * 5. 测试事件
 *
 */


function factorial(n) {
    if (n === 1){
        return 1;
    }
    return n * factorial(n - 1);
}

describe("1. 利用递归求n的阶乘", () => {

    // n! = 1 * 2 * 3 * ... * (n - 2) * (n - 1) * n

    /***
     *  5! = 5*4*3*2*1
     *  1! = 1 * 1
     *  2! = 2 * 1
     *     = 2
     *  3! = 3 * 2 * 1
     *     = n * (n-1) * 1
     *  4! = 4 * 3 * 2 * 1
     *     = 4 * (3 * 2 * 1)
     *     = 4 * 3!
     *     = n * (n-1)!
     */


    it('1', function () {
        let n = 1
        let result = 1;
        expect(factorial(n)).toStrictEqual(result)
    });

    it('2', function () {
        let n = 2
        let result = 2;
        expect(factorial(n)).toStrictEqual(result)
    })

    it('3', function () {
        let n = 3
        let result = 6;
        expect(factorial(n)).toStrictEqual(result)
    })

    it('4', function () {
        let n = 4
        let result = 24;
        expect(factorial(n)).toStrictEqual(result)
    })

    it('10', function () {
        let n = 10
        let result = 3628800;
        expect(factorial(n)).toStrictEqual(result)
    })


});




function fibonacci(n) {
    if (n === 1 || n === 2) {
        return 1;
    }
    return fn(n - 1) + fn(n - 2);
}

describe("2. 利用递归求斐波那契数列的第n位", () => {


    /***
     *  1，1，2, 3, 5, 8, 13, 21 ...
     *     fn(1) = 1
     *     fn(2) = 1
     *     fn(3) = 2
     *           = 1 + 1
     *           = fn(1) + fn(2)
     *
     *     fn(4) = 3
     *           = 1 + 2
     *           = fn(2) + fn(3)
     *           = fn(4 - 2) + fn(4 - 1)
     *
     *     fn(n) = fn(n - 2) + fn(n - 1)
     *
     */

    it('1', function () {
        let n = 1
        let result = 1;
        expect(fibonacci(n)).toStrictEqual(result)
    });

    it('5', function () {
        let n = 5
        let result = 5;
        expect(fibonacci(n)).toStrictEqual(result)
    })

});


describe("multiply", () => {
    it('1', function () {
        let a = 1
        let b = 10
        let result = 10;
        expect(multiply(a, b)).toStrictEqual(result)
    });

    it('2', function () {
        let a = 3
        let b = 4
        let result = 12;
        expect(multiply(a, b)).toStrictEqual(result)
    });
})

function multiply(a, b) {
    const arr = [0];
    for (let i = 1; i <= b; i++) {
        arr[i] = arr[i - 1] + a;
    }
    return arr[b];
}


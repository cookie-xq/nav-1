const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('xxx')
const xObject = JSON.parse(x) //转换为对象
const hashMap = xObject || [{
        logo: 'G',
        url: 'https://github.com/'
    },
    {
        logo: 'J',
        url: 'https://juejin.im/'
    },
    {
        logo: 'L',
        url: 'https://leetcode-cn.com/'
    },

]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //删除 / 开头的内容
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close" href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi);
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.addButton').on('click', () => {
    let url = window.prompt('请输入你要添加的网址：')
    if (url.indexOf('http') !== 0) {
        //indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    })
    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('xxx', string)
    console.log(hashMap)
}

$(document).on('keypress', (e) => {
    console.log(e.key)
    const {
        key
    } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})

$(document).on('keypress', 'input', (e) => {
    e.stopPropagation()
})
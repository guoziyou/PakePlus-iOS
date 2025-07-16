console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
    'color:orangered;font-weight:bolder'
)

// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    const currentHost = location.host

    if (
        origin && origin.href &&
        (
            origin.target === '_blank' ||
            isBaseTargetBlank
        )
    ) {
        const linkHost = new URL(origin.href).host

        if (linkHost === currentHost) {
            // ✅ 同域链接，允许跳转
            e.preventDefault()
            console.log('✔️ allow internal link:', origin.href)
            location.href = origin.href
        } else {
            // ❌ 外链，拦截（不提示）
            e.preventDefault()
            console.warn('⛔ blocked external link:', origin.href)
        }
    }
}

window.open = function (url, target, features) {
    const currentHost = location.host
    const linkHost = new URL(url, location.href).host

    console.log('attempted open:', url, target, features)

    if (linkHost === currentHost) {
        // ✅ 同域链接，允许跳转
        location.href = url
    } else {
        // ❌ 外链，拦截（不提示）
        console.warn('⛔ blocked external open:', url)
    }
}

// 捕获阶段监听所有点击
document.addEventListener('click', hookClick, { capture: true })

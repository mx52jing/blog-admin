export const dateFormat = (date = new Date(), fmt = 'yyyy-MM-dd') => {
    try {
        date = new Date(date)
        const opt = {
            'M+': date.getMonth() + 1, // 月
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds() // 秒
        }
        if(/(y+)/.test(fmt)) {
            const matchCode = RegExp.$1,
                replaceVal = (date.getFullYear() + '').substring(4 - matchCode.length)
            fmt = fmt.replace(matchCode, replaceVal)
        }
        for(let key in opt) {
            if(new RegExp(`(${key})`).test(fmt)) {
                const matchCode = RegExp.$1,
                    value = opt[key],
                    replaceVal = matchCode.length === 1 ? value : `00${value}`.substring((value + '').length)
                fmt = fmt.replace(matchCode, replaceVal)
            }
        }
        return fmt
    }catch (e) {
        console.log(e);
    }
}

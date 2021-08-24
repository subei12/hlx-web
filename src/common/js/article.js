
// url正则
const urlRegStr = `((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[\\-;:&=\\+\\$,\w]+@)?[A-Za-z0-9\\.\\-]+|(?:www\\.|[\\-;:&=\\+\\$,\\w]+@)[A-Za-z0-9\\.\\-]+)((?:\\/[\\+~%\\/\\.\\w\\-_]*)?\\??(?:[\\-\\+=&;%@\\.\\w_]*)#?(?:[\\.\\!\\/\\\\\\w]*))?)`;

// 匹配图片正则
const imageRegStr = `(<image>${urlRegStr}(,\\d*,\\d*)*<\/image>)`;

// 匹配动态图正则
const gifRegStr = `(<gif>${urlRegStr}(,\\d*,\\d*),${urlRegStr}<\/gif>)`;

// 寻找内容正则集合
const reg = `\\n|<\\/?text>|${imageRegStr}|${gifRegStr}|${urlRegStr}`


//  处理文章内容
export function handlerContent(content) {

    var str = content.replace(new RegExp(reg, 'g'), function (val) {

        // 处理标签
        switch (val) {
            // 处理换行
            case '\n':
                return '<br/>';
            // 段落
            case '<text>':
                return '<p>';
            case '</text>':
                return '</p>';
        }

        // 处理image图片
        const imgReg = new RegExp(imageRegStr, 'g');

        if (imgReg.test(val)) {

            let images = val.replace(/<\/*image>/g, '').split(',');
            return `<img src="${images[0]}" width="100%" height="auto" />`;
        }

        // 处理gif
        const gifReg = new RegExp(gifRegStr, 'g');

        if (gifReg.test(val)) {
            let gifs = val.replace(/<\/*gif>/g, '').split(',');
            return `<img src="${gifs[gifs.length - 1]}" width="100%" height="auto" />`;
        }

        // 处理url链接
        const urlReg = new RegExp(urlRegStr, 'g');

        if (urlReg.test(val)) {
            return `<a href="${val}" target="_blank">${val}</a>`;
        }

        return '';
    });

    return str;
}

// 解析图片
export function parseImg(contentText,currenrImgs) {
    const imgUrls = contentText.match(new RegExp(urlRegStr, 'g'));

    const imgArrs = [];

    const imgReg = /\.(jpg|png)/;

    Array.isArray(imgUrls) && imgUrls.forEach(itemUrl => {
        if (imgReg.test(itemUrl)) {
            imgArrs.push(itemUrl);
        }
    });
    
    return imgArrs.concat(currenrImgs);
}

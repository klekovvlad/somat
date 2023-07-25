const app = document.querySelector('.app');

const settings = {
    chatID: '-1001891588574',
    tokenBot: '6259676936:AAGZn7TwbVd-o4gQuqRpgASNgki89zKJCY8',
    startIndex: 0,
    lives: 2,
    imgs: {
        logo: {
            url: 'https://www.okeydostavka.ru/wcsstore/OKMarketSAS/share/promo_pages/landing/somat/logo.png',
            alt: 'Сомат логотип'
        },
        start: {
            url: 'https://www.okeydostavka.ru/wcsstore/OKMarketSAS/share/promo_pages/landing/somat/app-1.png',
            alt: 'Посуда'
        },
        winner: {
            url: 'https://www.okeydostavka.ru/wcsstore/OKMarketSAS/share/promo_pages/landing/somat/winner.png'
        }
    },
    frames: {
        quiz: {
            button: 'Далее'
        },
        start: {
            button: 'Начать',
            title: 'Тест',
            subtitle: 'Лига блестящих экспертов!'
        },
        winner: {
            promocode: 'СИЛАСОМАТ',
            promocodeInfo: 'Промокод дает право на скидку в размере 10% на покупку товаров бренда Сомат с 20.07.23 по 02.08.23',
            button: 'К покупкам',
            link: 'okeymobile://category?id=3074457345616844718',
            title: 'Вы главный по чистоте до блеска',
            subtitle: 'Пока рядом верный помощник Сомат для Вас нет невыполнимых задач!',
            class: 'app-body__winner'
        },
        looser: {
            button: 'Акции',
            link: 'okeymobile://category?id=3074457345616844718',
            title: 'Не обязательно быть экпертом в мойке посуды! Все средства от',
            subtitle: 'и так прекрасно справляются с любой задачей',
            class: 'app-body__looser'
        }
    }
}

const questions = [
    {
        question: 'Какую посуду нельзя мыть в посудомоечной машине?',
        answers: [
            {
                text: 'керамическую',
                true: 0
            },
            {
                text: 'деревянную ',
                true: 1
            },
            {
                text: 'из нержавеющей стали',
                true: 0
            }
        ],
        info: 'Дерево — очень нежный материал, требующий особого отношения. Из-за высоких температур влага и моющие средства проникают в структуру древесины, приводят к набуханию и растрескиванию изделий.'
    },
    {
        question: 'Какой тип мытья посуды расходует меньше воды?',
        answers: [
            {
                text: 'ручное мытьё посуды',
                true: 0
            },
            {
                text: 'мытьё в посудомоечной машине ',
                true: 1
            },
            {
                text: 'одинаковый расход в обоих случаях',
                true: 0
            }
        ],
        info: 'Исследование, проведённое в Германии, показало, что при мытье руками посуды после обеда на 12 человек требуется около 103 литров воды, а для полной загрузки посудомоечной машины нового поколения на 16 комплектов посуды требуется 10 литров воды'
    },
    {
        question: 'Как мыть посудомоечную машину?',
        answers: [
            {
                text: 'Руками с применением народных средств',
                true: 0
            },
            {
                text: 'Вызвать специалиста ',
                true: 0
            },
            {
                text: 'Использовать Сомат Интенсивный очиститель ',
                true: 1
            }
        ],
        info: 'Сомат Интенсивный очиститель эффективно борется с остатками жира и накипи на разных труднодоступных частях машины, очищает жир, известковый налет и все сопутствующие загрязнения.'
    },
    {
        question: 'В каком случае нужно использовать Сомат Ополаскиватель?',
        answers: [
            {
                text: 'Если хочется впечатлить гостей',
                true: 0
            },
            {
                text: 'Если отключили горячую воду',
                true: 0
            },
            {
                text: 'Если хочется идеально блестящей посуды ',
                true: 1
            }
        ],
        info: 'Ополаскиватель Сомат придает посуде сияющий блеск, ускоряет высыхание посуды, предотвращает появление разводов на посуде и образование известкового налета на деталях посудомоечной машины. Благодаря эффективным ПАВ в составе, Сомат позаботится о том, чтобы посудомоечная машина служила долго, а посуда всегда была чистой.'
    },
    {
        question: 'Куда класть таблетку для посудомоечной машины при коротком цикле?',
        answers: [
            {
                text: 'только в отсек для моющего средства',
                true: 0
            },
            {
                text: 'в отсек и на дно машины ',
                true: 0
            },
            {
                text: 'в корзину для посуды',
                true: 1
            }
        ],
        info: 'На коротком цикле таблетку нужно помещать в спец. отсек, но для гарантии растворения и распределения моющего средства во внутреннем объёме машины, так же можно поместить непосредственно на дно.'
    },
]

const StartGame = () => {
    if(/android/i.test(navigator.userAgent.toLowerCase())) {
        app.classList.add('app__android')
    }
    RenderFistFrame();
}

const RenderFistFrame = () => {
    const body = RenderElement('div', 'app-body', '')
    const button = RenderElement('button', 'app-button', settings.frames.start.button);
    body.append(
        RenderImg('app-img', settings.imgs.start.url, settings.imgs.start.alt),
        RenderElement('div', 'suptitle', settings.frames.start.title),
        RenderElement('div', 'title', settings.frames.start.subtitle)
    )
    app.append(
        RenderImg('app-logo', settings.imgs.logo.url, settings.imgs.logo.alt),
        body,
        button
    )
    const array = Shuffle(questions);
    button.onclick = () => {
        body.classList.remove('app-body__noevent')
        button.classList.add('app-button__hidden')
        app.classList.add('app__start')

        if(settings.startIndex < questions.length && settings.lives > 0) {
            button.textContent = settings.frames.quiz.button;
            ClearFrame(body)
            RenderQuestions(array, settings.startIndex, body, button)
            settings.startIndex++;
        }else if(settings.lives <= 0) {
            app.classList.remove('app__start')
            app.classList.add('app__looser')
            RenderFrame(button, body, settings.frames.looser)
            button.onclick = () => {
                window.location.href = settings.frames.looser.link
            };
        }else {
            app.classList.remove('app__start')
            app.classList.add('app__winner')
            RenderFrame(button, body, settings.frames.winner)
            button.onclick = () => {
                window.location.href = settings.frames.winner.link
            };
            app.querySelector('.app-logo').src = settings.imgs.winner.url;
            app.querySelector('.app-logo').classList.add('app-logo__winner')

            document.querySelector('.app-promocode').onclick = (e) => {
                e.target.classList.add('app-promocode__copied');
                navigator.clipboard.writeText(e.target.querySelector('.app-promocode-text').textContent)

                setTimeout(() => {
                    e.target.classList.remove('app-promocode__copied')
                }, 3000)
            }
            sendMessage(settings.tokenBot, settings.chatID, questions.length - (2 - settings.lives))
        }
    }
}

const RenderElement = (elType, elClass, elText) => {
    const el = document.createElement(elType);
    el.classList.add(elClass)
    el.textContent = elText
    return el
}

const RenderImg = (elClass, elSrc, elAlt) => {
    const img = document.createElement('img');
    img.classList.add(elClass);
    img.src = elSrc;
    img.alt = elAlt;
    return img
}

const ClearFrame = (frame) => {
    frame.innerHTML = ''
}

const Shuffle = (array) => {
    array.sort(() => Math.random() - 0.5)
    return array
}

const RenderQuestions = (array, index, body, button) => {
    const question = RenderElement('div', 'app-question', array[index].question)
    const answers = Shuffle(array[index].answers)
    body.append(
        question,
    )
    for(let i = 0; i < answers.length; i++) {
        const answer = RenderElement('button', 'app-answer', answers[i].text)
        answer.dataset.id = i
        question.after(
            answer
        )
        answer.onclick = (e) => {
            body.append(RenderElement('div', 'app-info', array[index].info))
            body.classList.add('app-body__noevent')
            button.classList.remove('app-button__hidden')
            if(answers[e.target.dataset.id].true) {
                e.target.classList.add('app-answer__success')
            }else{
                e.target.classList.add('app-answer__error')
                settings.lives--;
            }
        }
    }
}

const RenderFrame = (button, body, obj) => {
    button.classList.remove('app-button__hidden')
    ClearFrame(body);
    button.textContent = obj.button;
    body.classList.add(obj.class)
    body.append(
        RenderElement('div', 'title', obj.title),
        RenderElement('div', 'suptitle', obj.subtitle)
    )
    if(obj.promocode) {
        button.insertAdjacentHTML(
            'beforebegin',
            `<div class="app-promocode">
                <div class="app-promocode-text">${obj.promocode}</div>
            </div>`
        )
    }
    if(obj.promocodeInfo) {
        button.insertAdjacentHTML(
            'afterend',
            `<div class="app-desc">${obj.promocodeInfo}</div>`
        )
    }
}

//Отправка сообщений в ТГ
const sendMessage = (tokenBot, chatID, trueIndex) => {
    const messageBot = `Клиент прошел тест. Правильных ответов: ${trueIndex}`;
    const request = new XMLHttpRequest();
    const url = `https://api.telegram.org/bot${tokenBot}/sendMessage?chat_id=${chatID}&parse_mode=html&text=${messageBot}`;
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/x-www-form-url');
    request.send();
}

StartGame();
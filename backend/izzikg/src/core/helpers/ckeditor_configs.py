# Самые оптимальные настройки ckeditor (с)Toktosun
CKEDITOR_CONFIGS: dict = {
    'default': {
        'toolbar': [
            ['Undo', 'Redo',  # отменить повторить шаг
             '-', 'Bold', 'Italic', 'Underline',  # сделать текст жирным, курсивным, подчёркнутым
             '-', 'Link', 'Unlink', 'Anchor',  # добавить, убрать ссылку; добавить якорь
             '-', 'Format',  # выбор формата (h1, h2 и т.д.)
             '-', 'Maximize',  # развернуть во весь экран (очень удобно:) )
             '-', 'Table',  # вставить таблицу
             '-', 'Image',  # вставить картинку
             '-', 'Source',  # вставить ссылку
             '-', 'NumberedList', 'BulletedList'  # использовать нумерованный и маркерованный список
             ],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock',  # выравнивание
             '-', 'Font', 'FontSize', 'TextColor',  # изменить шрифт, его размер, и цвет текста
             '-', 'Outdent', 'Indent',  # отступы влево вправо
             '-', 'HorizontalRule',  # горизонтальная линия
             '-', 'Blockquote'  # поместить блок как цитату
             ]
        ],
        'height': 500,  # высота
        'width': '100%',  # ширина
        'toolbarCanCollapse': False,
        'forcePasteAsPlainText': True  # вставлять текст из других источников как простой текст
    },
    'page_block': {
        'toolbar': [
            ['Undo', 'Redo',  # отменить повторить шаг
             '-', 'Bold', 'Italic', 'Underline',  # сделать текст жирным, курсивным, подчёркнутым
             '-', 'Format',  # выбор формата (h1, h2 и т.д.)
             '-', 'Maximize',  # развернуть во весь экран (очень удобно:) )
             '-', 'Source',  # вставить ссылку
             ],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock',  # выравнивание
             '-', 'FontSize', 'TextColor',  # изменить его размер, и цвет текста
             '-', 'Outdent', 'Indent',  # отступы влево вправо
             ]
        ],
        'height': 400,  # высота
        'width': '100%',  # ширина
        'toolbarCanCollapse': False,
    },
    'help_content': {
        'toolbar': [
            ['Undo', 'Redo',  # отменить повторить шаг
             '-', 'Bold', 'Italic', 'Underline',  # сделать текст жирным, курсивным, подчёркнутым
             '-', 'Link', 'Unlink', 'Anchor',  # добавить, убрать ссылку; добавить якорь
             '-', 'Format',  # выбор формата (h1, h2 и т.д.)
             '-', 'Maximize',  # развернуть во весь экран (очень удобно:) )
             '-', 'Table',  # вставить таблицу
             '-', 'Image',  # вставить картинку
             '-', 'Source',  # вставить ссылку
             '-', 'NumberedList', 'BulletedList'  # использовать нумерованный и маркерованный список
             ],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock',  # выравнивание
             '-', 'FontSize', 'TextColor',  # изменить шрифт, его размер, и цвет текста
             '-', 'Outdent', 'Indent',  # отступы влево вправо
             '-', 'HorizontalRule',  # горизонтальная линия
             '-', 'Blockquote'  # поместить блок как цитату
             ]
        ],
        'height': 1000,  # высота
        'width': '100%',  # ширина
        'toolbarCanCollapse': False,
        'forcePasteAsPlainText': True  # вставлять текст из других источников как простой текст
    },
}

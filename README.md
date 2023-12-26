tablesorter (FORK) — это плагин jQuery для преобразования стандартной таблицы HTML с тегами THEAD и TBODY в сортируемую таблицу без обновления страницы. tablesorter может успешно анализировать и сортировать многие типы данных, включая связанные данные в ячейке. В этой раздвоенной версии добавлено множество новых улучшений, в том числе: буквенно-цифровая сортировка, функции обратного вызова пейджера, несколько виджетов, обеспечивающих стиль столбцов, приложение темы пользовательского интерфейса, прикрепленные заголовки, фильтры столбцов и изменение размера, а также расширенная документация с большим количеством демонстраций.

[![Версия NPM][npm-image]][npm-url] [![Состояние devDependency][david-dev-image]][david-dev-url] [![zenhub-image]][zenhub-url ]

### Уведомление!

* Из-за изменения внутреннего кэша ядро ​​tablesorter версии 2.16+, виджет фильтра и пейджер (как плагин, так и виджет) будут работать только с файлами той же или более новой версии.

### [Документация](https://mottie.github.io/tablesorter/docs/)

* См. [полную документацию](https://mottie.github.io/tablesorter/docs/).
* Вся оригинальная документация включена.
* Также включена информация из моего сообщения в блоге о [недокументированных опциях](https://wowmotty.blogspot.com/2011/06/jquery-tablesorter-missing-docs.html) и множество новых демонстраций.
* Журнал изменений перенесен из прилагаемого текстового файла в [вики-документацию](https://github.com/Mottie/tablesorter/wiki/Changes).

### Вопросы?

[![irc-image]][irc-url] [![slack-image]][slack-url] [![stackoverflow-image]][stackoverflow-url]

* Посетите страницу [FAQ](https://github.com/Mottie/tablesorter/wiki/FAQ).
* Выполните поиск в [основной документации](https://mottie.github.io/tablesorter/docs/) (нажмите кнопку меню в левом верхнем углу).
* Выполните поиск по [вопросам](https://github.com/Mottie/tablesorter/issues), чтобы узнать, поднимался ли вопрос или проблема раньше и, надеюсь, был ли они решены.
* Если кто-то доступен, задайте свой вопрос на IRC-канале `#tablesorter` на сайте freenode.net.
* Задайте свой вопрос в [Stackoverflow](https://stackoverflow.com/questions/tagged/tablesorter), используя тег tablesorter.
* Пожалуйста, не открывайте [новую проблему](https://github.com/Mottie/tablesorter/issues), если это действительно не проблема с плагином или запрос на добавление функции. Спасибо!

### Демо

* [Демо-версия базовой буквенно-цифровой сортировки] (https://mottie.github.io/tablesorter/).
* Ссылки на демонстрационные страницы можно найти в основной [документации] (https://mottie.github.io/tablesorter/docs/).
* Больше демонстраций и игровых площадок — обновлено на [вики-страницах](https://github.com/Mottie/tablesorter/wiki).

### Функции

* Многостолбцовая буквенно-цифровая сортировка и фильтрация.
* Сортировка нескольких тел — см. таблицу [options](https://mottie.github.io/tablesorter/docs/index.html#options) на главной странице документа.
* Поддерживает [Bootstrap v2–4] (https://mottie.github.io/tablesorter/docs/example-option-theme-bootstrap-v3.html).
* Парсеры для сортировки текста, буквенно-цифрового текста, URI, целых чисел, валюты, чисел с плавающей запятой, IP-адресов, дат (ISO, длинный и короткий форматы) и времени. [Добавьте свои собственные легко](https://mottie.github.io/tablesorter/docs/example-parsers.html).
* Встроенное редактирование — см. [демо](https://mottie.github.io/tablesorter/docs/example-widget-editable.html).
* Поддержка ROWSPAN и COLSPAN для элементов TH.* Поддержка вторичной «скрытой» сортировки (например, сохранение сортировки по алфавиту при сортировке по другим критериям).
* Расширяемость через [систему виджетов](https://mottie.github.io/tablesorter/docs/example-widgets.html).
* Кроссбраузерность: IE 6.0+, FF 2+, Safari 2.0+, Opera 9.0+, Chrome 5.0+.
* Небольшой размер кода, начиная с 25 КБ в минифицированном виде.
* Работает с jQuery 1.2.6+ (для некоторых виджетов требуется jQuery 1.4.1+).
* Работает с jQuery 1.9+ (`$.browser.msie` был удален; он необходим в исходной версии).

### Лицензирование

* Авторские права (c) 2007 г., Кристиан Бах.
* Исходную версию можно найти по адресу [http://tablesorter.com](http://tablesorter.com) или на [GitHub](https://github.com/christianbach/tablesorter).
* Двойная лицензия на основе лицензий [MIT](https://opensource.org/licenses/mit-license.php) или [GPLv2](https://www.gnu.org/licenses/gpl-2.0.html) ( Выбери один).

### Скачать

* Получите все файлы: [zip](https://github.com/Mottie/tablesorter/archive/master.zip) или [tar.gz](https://github.com/Mottie/tablesorter/archive/master. tar.gz).
* Используйте [bower](https://bower.io/): `bower install jquery.tablesorter`.
* Используйте [node.js](https://nodejs.org/): `npm installtablesorter`.
* CDNJS: https://cdnjs.com/libraries/jquery.tablesorter.
* jsDelivr: http://www.jsdelivr.com/?query=tablesorter

### Связанные проекты

* [Плагин для Rails](https://github.com/themilk
import assert from 'node:assert';

import urlRegex from '../src/utils/regex';

const valid = [
  'http://ya.ru',
  'https://www.ya.ru',
  'http://2-domains.ru',
  'http://ya.ru/path/to/deep/',
  'http://ya-ya-ya.ru',
  'http://ya.ya.ya.ru',
  'https://объясняем.рф/',
  'http://test.test/?test=test#test',
  'http://1-2-3.456.7-8-9.ru'
];

const invalid = [
  'ya.ru',
  'http://.ru',
  'sftp://ya.ru',
  'http://',
  'https://ya',
  'https://ya.',
  'https://ya..ru',
  'http://ya.ru/no spaces'
];

for (const url of valid) {
  assert.ok(
    urlRegex.test(url),
    `Валидный URL не прошёл проверку: ${url}`,
  );
}

for (const url of invalid) {
  assert.ok(
    !urlRegex.test(url),
    `Невалидный URL прошёл проверку: ${url}`,
  );
}

console.log('Все проверки прошли успешно!');

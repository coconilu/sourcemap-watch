sourceMap.SourceMapConsumer.initialize({
  "lib/mappings.wasm": "https://unpkg.com/source-map@0.7.3/lib/mappings.wasm"
});

const $ = function(selector) {
  return document.querySelector(selector);
};

function parseQueryString(str) {
  const _str = str.slice(1);
  const arr = _str.split("&");
  const obj = {};
  arr.forEach(item => {
    var query = item.split("=");
    obj[query[0]] = query[1];
  });
  return obj;
}

function highline(lineNumber) {
  Array.from($("#code>.linenums").children)[lineNumber - 1].style =
    "background-color: #404;";
}

const queryString = document.location.search;
const queryObj = parseQueryString(queryString);
const sourceMapUrl = queryObj["mapurl"];
const sourceMapLine = Number(queryObj["mapline"]);
const sourceMapColumn = Number(queryObj["mapcolumn"]);

$("#mapurl").innerText = sourceMapUrl ? decodeURIComponent(sourceMapUrl) : "空";
$("#mapline").innerText = sourceMapLine || "空";
$("#mapcolumn").innerText = sourceMapColumn || "空";

function loadSourceMap(url, line, column) {
  fetch(decodeURIComponent(url))
    .then(function(res) {
      return res.json();
    })
    .then(function(rawSourceMap) {
      sourceMap.SourceMapConsumer.with(rawSourceMap, null, consumer => {
        console.log(consumer.sources);
        let res = consumer.originalPositionFor({
          line,
          column
        });
        $("#surl").innerText = res.source;
        $("#sline").innerText = res.line;
        $("#scolumn").innerText = res.column;
        let index = consumer.sources.indexOf(res.source);
        $("#code").innerText = rawSourceMap["sourcesContent"][index];
        let observer = new MutationObserver(() => {
          highline(res.line);
        });
        observer.observe($("#code"), {
          childList: true
        });
      });
    });
}

if (sourceMapUrl) {
  loadSourceMap(sourceMapUrl, sourceMapLine, sourceMapColumn);
}

$("#demo").addEventListener("click", e => {
  let smurl =
    "https://bayes-1253621140.cos.ap-guangzhou.myqcloud.com/bundle.js.map";
  let smline = 1;
  let smcolumn = 1074;
  window.location.replace(
    `${window.location.href}?mapurl=${encodeURIComponent(
      smurl
    )}&mapline=${smline}&mapcolumn=${smcolumn}`
  );
});

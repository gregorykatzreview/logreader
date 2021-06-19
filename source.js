'use strict'
let fileName

function init() {
  initDropZone()
  initContent()
}

function initDropZone() {
  let dropZone = document.getElementById('dropZone')
  dropZone.addEventListener('dragover', function(event){
    event.stopPropagation()
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
  }, false)

  dropZone.addEventListener('drop', function(event){
    event.stopPropagation()
    event.preventDefault()
    changeDropZone()

    filename = event.dataTransfer.files[0].name
    readFile(event.dataTransfer.files[0]).then(file => {
      prepareContent(file)
    })
  })
}

function readFile(file) {
  return new Promise(resolve => {
    let reader = new FileReader()

    reader.onload = function(){
      resolve(reader.result)
    }

    reader.readAsArrayBuffer(file)
  })
}

function inputFilesSelected(filesList) {
  changeDropZone()
  fileName = filesList[0].name
  readFile(filesList[0]).then(file => {
    prepareContent(file)
  })
}

function changeDropZone() {
  dropZone.className = 'dropZone dropZoneTop noselect pointer'
}

function showInputFiles() {
  document.getElementById('inputObject').click()
}

function showDownload() {
  document.getElementById('download').className = 'downloadCenter noselect pointer'
}

function startDownload(signedFile) {
  let link = document.createElement('a')
  link.href = window.URL.createObjectURL(new Blob([signedFile], {type: 'application/xml'}))
  link.download = fileName
  document.body.appendChild(link)

  link.click()
}

function initContent() {

}

function prepareContent(file) {
  let content = document.getElementById('content')
  content.innerHTML = file
}

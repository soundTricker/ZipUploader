/**
* ZipUploader Core
*/
/*
* The MIT License
* 
* Copyright (c) 2011 soundTricker <[at]soundTricker318>
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/
function doGet(e) {
  var sitesService = new SitesService();
  var page = sitesService.getActivePage();
  
  if(page == null || page.isTemplate()) {
    var app = UiApp.createApplication();
    app.add(app.createLabel("this page is template."));
    return app;
  }
  var app = UiApp.createApplication();
  app.setTitle("Zip Uploader");
  var zipUi = new ZipUi(app);
  
  var files = sitesService.getAttachments(page);

  app.add(zipUi.createUi(files));
  
  return app;
}

function uploadZip(e) {
  var fileNames = e.parameter.fileList.split(",");
  //var fileNames = [];
  
  var sitesService = new SitesService();
  var zipUi = new ZipUi();
  var files = sitesService.getAttachments();
  var zipedFiles = [];
  var attachFilenames = [];
  for(var i = 0 ; i < files.length;i++) {
    Logger.log(fileNames);
    if(fileNames.contains(files[i].getTitle())) {
       zipedFiles.push(files[i]);
    }
    
    attachFilenames.push(files[i].getTitle());
  }
  
  if(zipedFiles.length == 0) {
    return zipUi.setMsg("file is not exists.").getUiApp();
  }
  
  if(attachFilenames.contains(e.parameter.filename)) {
    return zipUi.setMsg("Sorry.Same name file is exists. App can't attach it.").getUiApp();    
  }
  var zip = Utilities.zip(zipedFiles,e.parameter.filename);
  
  sitesService.getActivePage().addHostedAttachment(zip);
  return zipUi.setMsg("Complite.Please reload page").getUiApp(); 
}


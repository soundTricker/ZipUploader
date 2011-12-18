/**
* ZipUi
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
(function(){
  var ZipUi = this.ZipUi = function(uiApp) {
    this.app = uiApp || UiApp.getActiveApplication();
  };
  
  ZipUi.prototype = {
    createUi : function(files) {
      var app = this.app;
      //var app = UiApp.createApplication();
      var form = app.createFormPanel().setId("form");
      var vPanel = app.createVerticalPanel();
      var msgLabel = app.createLabel("").setVisible(false).setId("msgLabel");
      vPanel.add(msgLabel);
      vPanel.add(this.createListBox(files));
      form.add(vPanel);
      
      var text = app.createTextBox().setName("filename").setId("filename");
      var button = app.createButton("make Zip file").setEnabled(false);
      var disableHandler = app.createClientHandler().validateLength(text, 0, 0).forTargets(button).setEnabled(false);  
      var enableHandler = app.createClientHandler().validateLength(text, 1, null).forTargets(button).setEnabled(true);  
      text.addKeyUpHandler(enableHandler);
      text.addKeyUpHandler(disableHandler);
      var hPanel = app.createHorizontalPanel();
      hPanel.add(app.createLabel("Filename")).add(text);
      
      vPanel.add(hPanel);
      
      var buttonDisableHandler 
          = app.createClientHandler().validateLength(text, 1, null)
          .forEventSource().setEnabled(false)
          .forTargets(msgLabel).setVisible(true).setText("making...");
      
      var handler = app.createServerHandler('uploadZip').validateLength(text, 1, null);
      button.addClickHandler(buttonDisableHandler);
      button.addClickHandler(handler);
      handler.addCallbackElement(form);
      
      vPanel.add(button);
      
      return form;
    },
    createListBox : function(files) {
 
      var listBox = this.app.createListBox(true).setId("fileList").setName("fileList");
      for(var i = 0 ; i < files.length;i++) {
        var file = files[i];
        if(file.getTitle().indexOf(",") < 0) {
          listBox.addItem(file.getTitle());      
        }
      }
      return listBox;
    },
    
    setMsg : function(text) {
      this.app.getElementById("msgLabel").setVisible(true).setText(text);
      return this;
    },
    
    getUiApp : function() {
      return this.app;
    }
  };
})();
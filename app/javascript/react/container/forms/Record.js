import React from "react";

class Checkboxes extends React.Component {

  constructor(props) {
    super(props);
    this.initialState = {
      status: "",
      currOption: "",
      soundFiles: []
    };
    this.state = this.initialState;
  }

  selectOption(option) {
    if(option === "DESELECT") {
      this.setState(this.initialState)
    } else {
      this.setState({
        currOption: option
      })
    }
  }

  saveSoundFile() {
    // $.ajax({
    //   url: url,
    //   type: method,
    //   beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    //   dataType: 'json',
    //   data: { book_id: book.id },
    //   success: response => {
    //     console.log("after ajax ", response);
    //     this.setState({books: response.books});
    //     if(response.msg === "Validation failed: Book Dupliacte.") {
    //       M.toast({html: "绘本已添加过"});
    //     } else {
    //       M.toast({html: message});
    //     }
    //   }
    // });
  }

  render() {

    let required = this.props.required ? <span style={{color: "red"}}>*</span> : "";
    let fieldName = this.props.field;
    let currOption = this.state.currOption;

    let options = this.props.options.map((option, index) => {
      return (
        <SingleCheckbox 
          key={index}
          index={index}
          option={option}
          field={fieldName}
          currOption={currOption}
          selectOption={this.selectOption.bind(this)}
          saveSoundFile={this.saveSoundFile.bind(this)} 
        />
      );
    });

    return(
      <div>
        <div className="row">
          <div className="input-field col m12">
            <p>{this.props.question} {required} </p>
            <br/>
            {options}
          </div>
        </div>

        <div className="row">
          <div className="col s12 m12">
            <h6 className="center form-validation-msg" style={{padding: "20px 20px 20px 20px", backgroundColor: "#f39c12", color: "white"}}>请至少选择一项</h6>
            <div className="actions">
              <button type="button" className="btn-large disabled">提交</button>
            </div>
          </div>
        </div>

      </div>
    )
  }
};

class SingleCheckbox extends React.Component {

  constructor(props) {
    super(props);
    this.initialState = {
      status: "",
      mic: "",
      recorder: "",
      soundFile: "",
      micEnable: false,
      url: "",
      formData: ""
    };
    this.state = this.initialState;
  }
  
  selectOption(evt) {
    if(evt.target.checked) {
      let _mic
      _mic = new p5.AudioIn();
      _mic.start();
      this.setState({
        mic: _mic,
        status: "start",
        volunme: "0%"
      });
      this.props.selectOption(this.props.option);
    } else {
      this.setState(this.initialState);
      this.props.selectOption("DESELECT");
    }
  }

  record() {
    this.setState({
      status: "recording",
      url: ""
    });
    let _mic, _recorder, _soundFile;
    _mic = this.state.mic;
    if(_mic.enabled) {
      this.setState({
        micEnable: true
      })
      _recorder = new p5.SoundRecorder();
      _recorder.setInput(_mic);
      _soundFile = new p5.SoundFile();
      _recorder.record(_soundFile);
    } else {
      M.toast({html: '请应许浏览器使用麦克风!'})
      this.setState({
        micEnable: false
      })
    }
    this.setState({
      recorder: _recorder,
      soundFile: _soundFile
    });
  }

  stopRecording() {
    this.setState({
      status: "stop"
    });
    this.state.recorder.stop();
    // this.state.soundFile.play();
    this.saveSound(this.state.soundFile, "level-test" + this.props.index + 1 + ".wav");
  }

  saveAudio() {
    this.setState({
      status: "saved"
    });
  }

  interleave(leftChannel, rightChannel) {
    var length = leftChannel.length + rightChannel.length;
    var result = new Float32Array(length);
    var inputIndex = 0;
    for (var index = 0; index < length;) {
      result[index++] = leftChannel[inputIndex];
      result[index++] = rightChannel[inputIndex];
      inputIndex++;
    }
    return result;
  }

  writeUTFBytes(view, offset, string) {
    var lng = string.length;
    for (var i = 0; i < lng; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  writeFile(dataToDownload, filename, extension) {
    var type = 'application/octet-stream';
    var isSafari = window.safari !== undefined;
    if (isSafari) {
      type = 'text/plain';
    }
    var blob = new Blob(dataToDownload, {
      type: type
    });
    let url = URL.createObjectURL(blob);
    let formData = new FormData();
    formData.append("student[soundFile][]", blob, filename);
    this.setState({
      url: url,
      formData: formData
    })
    // var request = new XMLHttpRequest();
    // request.open("POST", "/students/audio");
    // request.send(formData);
  }

  saveSound(soundFile, name) {
    var leftChannel, rightChannel;
    leftChannel = soundFile.buffer.getChannelData(0);
    // handle mono files
    if (soundFile.buffer.numberOfChannels > 1) {
      rightChannel = soundFile.buffer.getChannelData(1);
    } else {
      rightChannel = leftChannel;
    }
    var interleaved = this.interleave(leftChannel, rightChannel);
    // create the buffer and view to create the .WAV file
    var buffer = new window.ArrayBuffer(44 + interleaved.length * 2);

    var view = new window.DataView(buffer);
    // write the WAV container,
    // check spec at: https://ccrma.stanford.edu/courses/422/projects/WaveFormat/
    // RIFF chunk descriptor
    this.writeUTFBytes(view, 0, 'RIFF');
    view.setUint32(4, 36 + interleaved.length * 2, true);
    this.writeUTFBytes(view, 8, 'WAVE');
    // FMT sub-chunk
    this.writeUTFBytes(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    // stereo (2 channels)
    view.setUint16(22, 2, true);
    view.setUint32(24, 44100, true);
    view.setUint32(28, 44100 * 4, true);
    view.setUint16(32, 4, true);
    view.setUint16(34, 16, true);
    // data sub-chunk
    this.writeUTFBytes(view, 36, 'data');
    view.setUint32(40, interleaved.length * 2, true);
    // write the PCM samples
    var lng = interleaved.length;
    var index = 44;
    var volume = 1;
    for (var i = 0; i < lng; i++) {
      view.setInt16(index, interleaved[i] * (32767 * volume), true);
      index += 2;
    }
    this.writeFile([view], name, 'wav');
  };

  render() {
    let fieldName = "student[" + this.props.field + "][]";

    let audioIcon = "";
    if(this.state.status === "start") {
      audioIcon = <button onClick={this.record.bind(this)} className="btn" type="button">点击开始录音
        <i className="material-icons right">keyboard_voice</i>
      </button>
    } else if(this.state.status === "recording") {
      audioIcon = <button onClick={this.stopRecording.bind(this)} className="btn red" type="button">停止录音
        <i className="material-icons right">radio_button_checked</i>
      </button>
    } else if(this.state.status === "stop") {
      audioIcon = <button onClick={this.record.bind(this)} className="btn waves-effect waves-light" type="button">重新录音
        <i className="material-icons right">redo</i>
      </button>
    }

    let recordWidget = this.state.status != "" ? 
    <div className="row no-margin" style={{padding: "10px 0px 10px 0px"}}>
      <div className="col m12">
        {audioIcon}
      </div>
    </div> : "";

    let audio = this.state.url != "" ? 
    <div className="row no-margin">
      <div className="col m6">
        <audio controls >
          <source src={this.state.url} style={{width: "100%"}} />
        </audio> 
      </div>
    </div> : "";

    let disabled = (this.props.currOption != "" && this.props.currOption != this.props.option) ? true : false;
    
    return(
      <div>
        <p>
          <label>
            <input className="filled-in record" type="checkbox" name={fieldName} disabled={disabled} onClick={this.selectOption.bind(this)} />
            <span>{this.props.option}</span>
          </label>
        </p>
        {recordWidget}
        {audio}
      </div>
    )
  }
};

export default Checkboxes;
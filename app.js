class Game extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activePanel: null
    };
  }

  handleClick(panel) {
    if (this.state.activePanel == null) {
      this.setState({
        activePanel: panel
      });
    }
  }

  handleClose() {
    const panel = document.querySelector('.panel');
    if (panel) {
      panel.classList.add('close');
    }

    setTimeout(() => {
      this.setState({ activePanel: null });
    }, 100);
  }
  
  render() {

    return (
      <div>

        <canvas id="canvas_main"></canvas>
        <div className="navbar">
          <img src="./assets/img/profile-image.png" alt="Profile Image" />
          <span>{this.props.characterName}</span>
          <span>{this.props.currency}</span>
        </div>
        
        <div className="bottom-navbar">
          <button className="button1" onClick={() => this.handleClick("panel1")}>
            <img src="./assets/img/icon_panel1.png" />
            <div class="message">Profile</div>
          </button>
          <button className="button2" onClick={() => this.handleClick("panel2")}>
            <img src="./assets/img/icon_panel2.png" />
            <div class="message">Appearance</div>
          </button>
          <button className="button3" onClick={() => this.handleClick("panel3")}>
            <img src="./assets/img/icon_panel3.png" />
            <div class="message">Advice</div>
          </button>
          <button className="button4" onClick={() => this.handleClick("panel4")}>
            <img src="./assets/img/icon_panel4.png" />
            <div class="message">Message</div>
          </button>
          <button className="button5" onClick={() => this.handleClick("panel5")}>
            <img src="./assets/img/icon_panel5.png" />
            <div class="message">History</div>
          </button>
        </div>

        {this.state.activePanel === "panel1" && (

          <ProfilePanel onClose={() => this.handleClose()} />

        )}
        {this.state.activePanel === "panel2" && (

          <CustomizationPanel onClose={() => this.handleClose()} />

        )}
        {this.state.activePanel === "panel3" && (

          <AdvicePanel onClose={() => this.handleClose()} />

        )}
        {this.state.activePanel === "panel4" && (

          <MessagePanel onClose={() => this.handleClose()} />

        )}
        {this.state.activePanel === "panel5" && (

          <HistoryPanel onClose={() => this.handleClose()} />
          
        )}

      </div>
    );
  }
}

// ------------------- Panel 1 Profile -------------------
class ProfilePanel extends React.Component {
  handleBack = () => {
    this.props.onClose();
  };

  render() {
    return (
      <div className="panel">
        <div className="panel-header">
          <button onClick={this.handleBack} style={{ backgroundImage: "url('./assets/img/back_btn.png')" }} />
          <h2 className="panel-title">Profile</h2>
        </div>
        <div className="panel-content">

          <div className="profile">
            <div className="profile-image">
              <img src="./assets/img/profile-image.png" />
            </div>
            <div className="profile-details">
              <div className="profile-header">
                <p>Name</p>
                <p>Title</p>
              </div>
              <div className="profile-header">
                <p>Username</p>
                <p>Description</p>
              </div>
              <div className="profile-header">
                <p>Username</p>
                <p>Description</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

// ------------------- Panel 2 Appearance -------------------
class CustomizationPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gender: 'male',
      character: 'default'
    };
    this.changeGender = this.changeGender.bind(this);
    this.modifyCharacter = this.modifyCharacter.bind(this);
    this.confirmChanges = this.confirmChanges.bind(this);
  }

  handleBack = () => {
    this.props.onClose();
  };

  changeGender(gender) {
    this.setState({ gender, character: 'default' });
  }

  modifyCharacter(type, direction) {
    // Modify character based on type and direction
    // For example, change hairstyle, eye color, etc.
  }

  confirmChanges() {
    // Save character changes
  }

  render() {
    const { gender, character } = this.state;
    return (
      <div className="panel">
        <div className="panel-header">
          <button onClick={this.handleBack} style={{ backgroundImage: "url('./assets/img/back_btn.png')" }} />
          <h2 className="panel-title">Appearance</h2>
        </div>
        <div className="panel-content">

        <div className="character-customization-panel">
          <div className="gender-select">
            <button
              className={gender === 'male' ? 'active' : ''}
              onClick={() => this.changeGender('male')}
            >
              Male
            </button>
            <button
              className={gender === 'female' ? 'active' : ''}
              onClick={() => this.changeGender('female')}
            >
              Female
            </button>
          </div>
          <div className="character-modify">
            <div className="left-buttons">
              <button onClick={this.handleLeftButtonClick}>Left 1</button>
              <button onClick={this.handleLeftButtonClick}>Left 2</button>
              <button onClick={this.handleLeftButtonClick}>Left 3</button>
            </div>

            <div className="character-display">
              <img src={`./assets/img/${gender}-${character}.png`} alt="Character" />
            </div>

            <div className="right-buttons">
              <button onClick={this.handleRightButtonClick}>Right 1</button>
              <button onClick={this.handleRightButtonClick}>Right 2</button>
              <button onClick={this.handleRightButtonClick}>Right 3</button>
            </div>
          </div>
          <div className="confirm-changes">
            <button onClick={this.confirmChanges}>Confirm</button>
          </div>
        </div>

        </div>
      </div>
    );
  }
}

// ------------------- Panel 3 Advice -------------------
const advicePanels = [
  {
    title: "Health Category",
  },
  {
    title: "Floor",
  },
  {
    title: "Floor Detail",
  },
  {
    title: "Docter Detail",
  },
];
  
class AdvicePanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPanelIndex: 0,
    };
  }

  handleNext = () => {
    this.setState({
      currentPanelIndex: this.state.currentPanelIndex + 1,
    });
  };

  handleBack = () => {
    this.setState({
      currentPanelIndex: Math.max(0, this.state.currentPanelIndex - 1),
    });

    if (this.state.currentPanelIndex <= 0) {
      this.props.onClose();
    }
  };

  render() {
    const currentPanel = advicePanels[this.state.currentPanelIndex];

    return (
      <div className="panel">
        <div className="panel-header">
        <button onClick={this.handleBack} style={{ backgroundImage: "url('./assets/img/back_btn.png')" }} />
          <h2 className="panel-title">{currentPanel.title}</h2>
        </div>
        <div className="panel-content">

        {this.state.currentPanelIndex == 0 && (
          <div className="content3-0 grid">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="content3-0 grid-item" onClick={this.handleNext}>
                <img src="./assets/img/category-icon.png" />
              </div>
            ))}
          </div>
        )}

        {this.state.currentPanelIndex == 1 && (
          <div className="content3-1">
            {Array.from({ length: 10 }, (_, i) => (
              <div className="content3-1 item" onClick={this.handleNext}>
                <img src="./assets/img/category-icon.png"/>
                <div className="content3-1 details">
                  <div className="content3-1 detail-1">
                    <h3>Floor Name</h3>
                    <p>xxxxxxxxxxxxxxxx</p>
                  </div>
                  <div className="content3-1 detail-2">
                    <p>0 Offline</p>
                    <h2>5/100</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {this.state.currentPanelIndex == 2 && (
          <div className="content3-2">
            <div className="content3-2 floor">
              <img src="./assets/img/category-icon.png"/>
              <div>
                <h3>Floor Name</h3>
                <p>xxxxxxxxxxxxxxxx</p>
                <p>Online 5/100</p>
              </div>
            </div>
            {Array.from({ length: 5 }, (_, i) => (
              <div className="content3-2 item" onClick={this.handleNext}>
                <img src="./assets/img/profile-image.png"/>
                <div className="content3-2 details">
                  <div className="content3-2 detail">
                    <h3>Docter Name</h3>
                    <p>สาขา xxxxxxxxx จาก xxxxxxxxx</p>
                    <p>offline</p>
                  </div>
            
                </div>
              </div>
            ))}
          </div>
        )}

        {this.state.currentPanelIndex == 3 && (
          <div className="content3-3">
            <div className="content3-3 doctor">
              <img src="./assets/img/profile-image.png"/>
              <div className="content3-3 doctor detail">
                <h3>Doctor Name</h3>
                <p>xxxxxxxxxxxxxxxx</p>
                <p>Online 5/100</p>
              </div>
            </div>
            <div className="content3-3 join">
              <button>JOIN NOW {'\n'} 50 HVT</button>
            </div>
            <div className="content3-3 detail">
              <h5>Description</h5>
              <p>xxxxxxxxxxxxxxxxxxxxxxxxxxx/nxxxxxxxxxxxxxxxxxxxxxx</p>
            </div>
          </div>
        )}
          
        </div>
      </div>
    );
  }
}

// ------------------- Panel 4 Message -------------------
class MessagePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          content: 'Welcome to the game!',
          sender: {
            name: 'Docter Name',
            profileImage: './assets/img/profile-image.png'
          }
        },
        {
          content: 'You have 3 lives remaining',
          sender: {
            name: 'Docter Name',
            profileImage: './assets/img/profile-image.png'
          }
        },
        {
          content: 'You found a power-up!',
          sender: {
            name: 'Docter Name',
            profileImage: './assets/img/profile-image.png'
          }
        },
        {
          content: 'Game over. Try again?',
          sender: {
            name: 'Docter Name',
            profileImage: './assets/img/profile-image.png'
          }
        }
      ]
    };
  }
  
  handleBack = () => {
    this.props.onClose();
  };

  render() {
    return (
      <div className="panel">
        <div className="panel-header">
          <button onClick={this.handleBack} style={{ backgroundImage: "url('./assets/img/back_btn.png')" }} />
          <h2 className="panel-title">Profile</h2>
        </div>
        <div className="panel-content">

          <div className="message-list">
            <ul>
              {this.state.messages.map((message, index) => (
                <li key={index}>
                  <div className="message-sender">
                    <img src={message.sender.profileImage} />
                  </div>
                  <div className="message-content">
                    <p className="bold">{message.sender.name}</p>
                    <p>{message.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    );
  }
}

// ------------------- Panel 5 History -------------------

class HistoryPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      histories: [
        {
          date: '01/01/2023',
          time: '09:00-09:30',
          floor: 1,
          doctor: 'Mr.xxxxx',
          note: 'common health issue'
        },
        {
          date: '01/01/2023',
          time: '09:00-09:30',
          floor: 1,
          doctor: 'Mr.xxxxx',
          note: 'common health issue'
        },
        {
          date: '01/01/2023',
          time: '09:00-09:30',
          floor: 1,
          doctor: 'Mr.xxxxx',
          note: 'common health issue'
        },
        {
          date: '01/01/2023',
          time: '09:00-09:30',
          floor: 1,
          doctor: 'Mr.xxxxx',
          note: 'common health issue'
        }
      ]
    };
  }
  
  handleBack = () => {
    this.props.onClose();
  };

  render() {
    return (
      <div className="panel">
        <div className="panel-header">
          <button onClick={this.handleBack} style={{ backgroundImage: "url('./assets/img/back_btn.png')" }} />
          <h2 className="panel-title">Profile</h2>
        </div>
        <div className="panel-content">

          <div className="history-list">
            <ul>
              {this.state.histories.map((history, index) => (
                <li key={index}>
                  <div className="history-datetime">
                    <p className="bold">{history.date}</p>
                    <p className="bold">{history.time}</p>
                  </div>
                  <div className="history-detail">
                    <p>{history.floor}</p>
                    <p>{history.doctor}</p>
                    <p>{history.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game characterName="Player 1" currency="1000" />,
  document.getElementById("root")
);

// from canvas.js
createCharCustomize();
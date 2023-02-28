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
        <button className="button1" onClick={() => this.handleClick("panel1")} style={{ backgroundImage: "url('./assets/img/icon_panel1.png')" }}></button>
        <button className="button2" onClick={() => this.handleClick("panel2")} style={{ backgroundImage: "url('./assets/img/icon_panel2.png')" }}></button>
        <button className="button3" onClick={() => this.handleClick("panel3")} style={{ backgroundImage: "url('./assets/img/icon_panel3.png')" }}></button>
        <button className="button4" onClick={() => this.handleClick("panel4")} style={{ backgroundImage: "url('./assets/img/icon_panel4.png')" }}></button>
        <button className="button5" onClick={() => this.handleClick("panel5")} style={{ backgroundImage: "url('./assets/img/icon_panel5.png')" }}></button>
        </div>

        {this.state.activePanel === "panel1" && (
          <ProfilePanel onClose={() => this.handleClose()} title="Panel 1">
            <p>Panel 1 Content</p>
          </ProfilePanel>
        )}
        {this.state.activePanel === "panel2" && (
          <AdvicePanel onClose={() => this.handleClose()} title="Panel 2">
            <p>Panel 2 Content</p>
          </AdvicePanel>
        )}
        {this.state.activePanel === "panel3" && (

          <AdvicePanel onClose={() => this.handleClose()} />

        )}
        {this.state.activePanel === "panel4" && (
          <AdvicePanel onClose={() => this.handleClose()} title="Panel 4">
            <p>Panel 4 Content</p>
          </AdvicePanel>
        )}
        {this.state.activePanel === "panel5" && (
          <AdvicePanel onClose={() => this.handleClose()} title="Panel 5">
            <p>Panel 5 Content</p>
          </AdvicePanel>
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
          <button onClick={this.handleBack}>Close</button>
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
class AppearancePanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPanelIndex: 0,
    };
  }

  handleBack = () => {
    if (this.state.currentPanelIndex <= 0) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className="panel">
        <div className="panel-header">
          <button onClick={this.handleBack}>Close</button>
          <h2 className="panel-title">Appearance</h2>
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
          <button onClick={this.handleBack}>Close</button>
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

ReactDOM.render(
  <Game characterName="Player 1" currency="1000" />,
  document.getElementById("root")
);

// from canvas.js
createCharCustomize();
  
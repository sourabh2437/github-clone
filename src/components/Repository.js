import React,{Component} from 'react';
import moment from 'moment';
class Repository extends Component{
  constructor(props){
    super(props);
    this.state = {
      circleClass : ""
    }
    this.getLastUpdatedOnDate = this.getLastUpdatedOnDate.bind(this);
  }
  componentDidMount(){
    if(this.props.data.language === "JavaScript"){
      this.setState({
        circleClass:"dotJavaScript"
      });
    }else if(this.props.data.language === "Python"){
      this.setState({
        circleClass:"dotPython"
      });
    }
    else if(this.props.data.language === "CSS"){
      this.setState({
        circleClass:"dotCSS"
      });
    }
    else if(this.props.data.language === "C++"){
      this.setState({
        circleClass:"dotCPP"
      });
    }
    else if(this.props.data.language === "HTML"){
      this.setState({
        circleClass:"dotHTML"
      });
    }
  }
  getLastUpdatedOnDate(date){

      var one_day=1000*60*60*24;

      // Convert both dates to milliseconds
      var date1_ms = new Date(date).getTime();
      var date2_ms = new Date().getTime();

      // Calculate the difference in milliseconds
      var difference_ms = date2_ms - date1_ms;

      // Convert back to days and return
      var dayDiff = Math.round(difference_ms/one_day);
      if(dayDiff > 365){
        return moment(date, "YYYYMMDD").fromNow();
      }else{
        return moment(date).format('ll');

      }
    }
  render(){
    return (
      <div className="repo_container">
        <div className="repo_title">
        <a>{this.props.data.name}</a></div>
        <div className="repo_details">
        <span className = {this.state.circleClass}></span>
        {this.props.data.language}
        <span className="repo_last_updated_on">
          Updated on  {this.getLastUpdatedOnDate(this.props.data.updated_at)}
        </span>
        </div>

          <hr />
      </div>
    );
  }
}
export default Repository;

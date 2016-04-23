import * as React from 'react';
let styles = require('./style.css');

export interface IProps {
  params: any;
}

class MarketItem extends React.Component<IProps , {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    let { marketId } = this.props.params;
    return (
        <div className={styles.marketDetail}>
          {marketId}
        </div>
    );
  }
}

export default MarketItem;

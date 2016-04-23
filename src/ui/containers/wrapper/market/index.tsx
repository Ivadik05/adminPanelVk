import * as React from 'react';
import { Container } from '../../../components/container';
import { Link } from 'react-router';
import { Markup } from '../../../components/markup';
import { connect } from 'react-redux';
import { Dispatch as IDispatch } from 'redux';
import { utils } from '../../../../utils';
import { routeConstants } from '../../../../routes';
let styles = require('./style.css');

export interface IProps {
  params: Object;
  market: any;
  dispatch: IDispatch;
}

class Market extends React.Component<IProps , {}> {
  constructor(props) {
    super(props);
  }

  public render() {
    let markets = this.props.market.data.map((market) => {
      return (
          <div className={styles.marketItem}>
            <div className={styles.inner}>
              <Link to={{ pathname: `${routeConstants.MARKET}/${market.id}`}} activeClassName={styles.active}>
                <div className={styles.marketPhoto}>
                  <img src={market.photo} alt={market.title}/>
                </div>
                <div className={styles.name}>{market.title}</div>
                <div className={styles.price}>{market.price}</div>
              </Link>
            </div>
          </div>
      );
    });
    console.error('marketId', this.props.params['marketId']);
    return (
        <div className={styles.market}>
          {this.props.params['marketId'] &&
            (<div className={styles.overlay}>
              <div className={styles.marketDetail}></div>
            </div>)
          }
          <Container>
            <Markup
                str={this.props.market.contentText} />
            <div className={styles.marketList}>
              {markets}
            </div>
          </Container>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  market: state.market
});

export default connect(mapStateToProps)(Market);

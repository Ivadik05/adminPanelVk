import * as React from 'react';
import { Dispatch as IDispatch } from 'redux';
import { connect } from 'react-redux';
import { Container } from '../../../components/container';
import { Markup } from '../../../components/markup';
import * as Helmet from 'react-helmet';
let styles = require('./style.css');

export interface IProps extends React.Props<Delivery> {
  delivery: any;
  dispatch: IDispatch<{}>;
}

class Delivery extends React.Component<IProps, {}> {
  public render() {
    return (
        <div className={styles.delivery}>
          <Helmet
              title='Оплата и доставка'
          />
          <Container>
            <Markup
                str={this.props.delivery.contentText} />
          </Container>
        </div>
    );
  }
}


const mapStateToProps = state => ({
  delivery: state.delivery
});

export default connect(mapStateToProps)(Delivery);

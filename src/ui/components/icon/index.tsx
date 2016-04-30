import * as React from 'react';
import * as iconList from './iconList';
let styles = require('./style.css');

export { iconList };

interface IProps extends React.Props<Icon> {
  params: IIcon;
  fill?: string;
  className?: string;
}

export interface IIcon {
  viewBox: string;
  fillRule: string;
  path?: string;
  iconContent?: any;
}

export class Icon extends React.Component<IProps, void> {

  public displayName: string = 'Icon';

  public refs: {
    [key: string]: (Element);
    iconPath: (HTMLInputElement);
  };

  public componentDidMount() {
    let { fillRule } = this.props.params;
    if (this.refs.iconPath && fillRule ) {
      this.refs.iconPath.setAttribute('fill-rule', fillRule);
    }
  }

  public render() {
    let className = this.props.className ?
        this.props.className :
        styles.svg;

    return (
        this.props.params.iconContent ? this.props.params.iconContent :
            <svg className={className}
                 viewBox={this.props.params.viewBox}>
              <path d={this.props.params.path}
                    ref='iconPath'
                    fill={this.props.fill}/>
            </svg>
    );
  }
}

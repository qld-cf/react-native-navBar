/**
 * Created by 李卓原 on 2018/7/6.
 * email: zhuoyuan93@gmail.com
 *
 */

import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    Platform,
    StatusBar,
    ViewPropTypes
} from 'react-native';

import PropTypes from 'prop-types';


const NAV_BAR_HEIGHT_ANDROID = 50;
const NAV_BAR_HEIGHT_IOS = 44;
const StatusBarShape = {
    barStyle: PropTypes.oneOf(['light-content', 'default', 'dark-content']),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
};

class NavigationBar extends React.Component {

    static propTypes = {
        statusBar: PropTypes.shape(StatusBarShape),
        showBackgroundIMG: PropTypes.bool,
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        titleLayoutStyle: ViewPropTypes.style,
        showLeft: PropTypes.bool,
        leftText: PropTypes.string,
        leftTextStyle: ViewPropTypes.style,
        showleftImg: PropTypes.bool,
        leftButton: PropTypes.element,
        onLeftClick: PropTypes.func,
        showRight: PropTypes.bool,
        rightText: PropTypes.string,
        rightTextStyle: ViewPropTypes.style,
        rightButton: PropTypes.element,
        onRightClick: PropTypes.func,
        leftImg: PropTypes.element,
        rightImg: PropTypes.element
    };

    static defaultProps = {
        statusBar: {
            barStyle: 'default',
            hidden: false,
        },
        showLeft: true,
        showleftImg: true,  //是否显示返回箭头
        leftText: '',   //返回键位置的文字
        showRight: false,
        rightText: '更多',
        showBackgroundIMG: true,  //是否有背景图片
        leftImg: require('./image/back.png'),  //默认的返回键对应的图片
    };

    constructor(props) {
        super(props);
    }

    render() {
        let leftButton = this._renderLeft();
        let rightButton = this._renderRight();
        let statusBar = <View>
            <StatusBar {...this.props.statusBar}/></View>;
        let titleView = this.props.titleView ? this.props.titleView :
            <Text style={[styles.titleStyle, this.props.titleLayoutStyle]}>{this.props.title}</Text>;
        let content = <View style={styles.content}>
            {leftButton}
            <View style={styles.titleView}>{titleView}</View>
            {rightButton}
        </View>;
        return (
            <ImageBackground source={this.props.showBackgroundIMG ? require('image/background.png') : null}
                             style={[styles.container, this.props.style]}>
                {statusBar}
                {content}
            </ImageBackground>
        )
    }

    _renderLeft() {
        let {leftButton, leftTextStyle, showLeft, navigation, onLeftClick, leftText, showleftImg, leftImg} = this.props;
        if (!showLeft) {
            return null;
        }
        if (leftButton == null) {
            return (
                <TouchableOpacity onPress={() => {
                    if (onLeftClick) {
                        onLeftClick();
                    } else {
                        if (navigation) navigation.goBack()
                    }
                }}>
                    <View style={styles.leftContainer}>
                        {
                            showleftImg ?
                                <Image source={leftImg}
                                       style={{
                                           width: 25,
                                           height: 25
                                       }}/>
                                : null
                        }
                        <Text style={[styles.leftRightStyle, leftTextStyle]}>{leftText}</Text>
                    </View>
                </TouchableOpacity>)
        }
        return leftButton;
    }

    _renderRight() {
        let {rightButton, rightTextStyle, showRight, onRightClick, rightText, rightImg} = this.props;
        if (!showRight) {
            return null;
        }
        if (rightButton == null) {
            return (
                <TouchableOpacity onPress={() => {
                    if (onRightClick) {
                        onRightClick()
                    }
                }}>
                    <View style={styles.rightContainer}>
                        {
                            rightImg ?
                                <Image source={rightImg}
                                       style={{
                                           width: 25,
                                           height: 25
                                       }}/>
                                : null
                        }
                        <Text style={[styles.leftRightStyle, rightTextStyle]}>{rightText}</Text>
                    </View>
                </TouchableOpacity>)
        }
        return rightButton;
    }
}


const styles = StyleSheet.create({
    container: {
        width: 600,
        height: 58,
        justifyContent: 'center',
    },
    content: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    },
    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0,
    },
    titleStyle: {
        fontSize: 18,
        color: 'white'

    },
    leftRightStyle: {
        color: 'white',
        fontSize: 14
    },

    leftContainer: {
        marginLeft: 17,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightContainer: {
        marginRight: 17,
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default NavigationBar;

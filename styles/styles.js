import {Stylesheet, StyleSheet} from 'react-native';

const style = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 20
    },
    detailsContainer: {
        marginTop: 250,
        paddingTop: 20,
        paddingBottom: 30,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'rgba(32, 32, 32, 0.9)'
    },
    text: {
        color: '#ffffff'
    },
    titleText: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10
    },
    headingText: {
        fontSize: 18,
        fontWeight: '500',
        paddingTop: 20,
        paddingBottom: 10
    },
    normalText: {
        fontSize: 12
    },
    posterSize: {
        width: 92,
        height: 136,
        margin: 5
    },
    avatarContainer: {
        width: 60,
        height: 60
    },
    avatarSize: {
        width:50,
        height: 50,
        margin: 10,
        borderRadius: 25
    },
    avatarText: {
        maxWidth: 60,
    }
});

export default style;

import { StyleSheet } from 'react-native';


const styles = {}

styles.pages = StyleSheet.create({
    code: {
        justifyContent: 'center',
        backgroundColor: 'grey',
        borderColor: "#2F4F4F",
        borderWidth: 1,
        margin: 10,
        fontSize: 12,
        color: 'white',
        paddingLeft: 10,
    },
    numbers: {
        justifyContent: 'center',
        backgroundColor: 'grey',
        borderColor: "#2F4F4F",
        borderWidth: 1,
        margin: 10,
        fontSize: 12,
        color: 'white',
        paddingLeft: 10,
        width: '20%',
        alignItems: 'center',
    },
    steps: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginLeft: 10
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        color: "#2F4F4F",
        margin: 10,
    },
    navi: {

        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: "#2F4F4F",
        alignItems: "stretch",
    },
    column: {
        alignSelf: 'center',
        flexDirection: 'column',
        width: '50%'
    },
    columns: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    bottomColumn: {
        alignSelf: 'flex-end',
        flexDirection: 'column',
        width: '50%'
    },

});


export default styles;
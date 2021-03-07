import Container from "mobro/lib/component/container";
import Font from "mobro/components/edit/data/Font";
import {getFontList, getFontListFetchingState} from "mobro/reducers/font";
import {fetchFontList} from "mobro/actions/font";

const mapStateToProps = (state) => ({
    fontListFetchingState: getFontListFetchingState(state),
    fontList: getFontList(state)
});

const mapDispatchToProps = (dispatch) => ({
    fetchFontList: () => dispatch(fetchFontList())
});

export default Container.create("edit.data.font", Font)
    .basic(false)
    .connect(mapStateToProps, mapDispatchToProps)
    .generate();
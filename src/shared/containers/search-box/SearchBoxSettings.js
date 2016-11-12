import './SearchBoxSettings.css';
import React, { Component, PropTypes } from 'react';
import { round } from 'lodash';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import normalizeNumber from 'normalize-number';
import Slider from 'rc-slider';
import MaterialIcon from 'shared/components/icon/MaterialIcon';
import Tooltip from 'shared/components/tooltip/Tooltip';
import { update, reset } from 'shared/state/search/settings/actions';

const marks0to10 = { 0: '', 2.5: '', 5: '', 7.5: '', 10: '' };
const marks0to20 = { 0: '', 5: '', 10: '', 15: '', 20: '' };


class SearchBoxSettings extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <Tooltip trigger="click" overlayClassName="search-box-settings-component-tooltip" placement="bottom"
                overlay={ this._renderOverlay() } onVisibleChange={ (visible) => this._onVisibleChange(visible) } >
                <div className="search-box-settings-component">
                    <MaterialIcon id="settings" className={ this.state.isOpen ? 'hover' : '' }/>
                </div>
            </Tooltip>
        );
    }

    _renderOverlay() {
        const weightRange = [0, this.props.qualityWeight + this.props.popularityWeight + this.props.maintenanceWeight];

        return (
            <div className="clearfix">
                { /* ------------- Weights sliders ------------- */ }
                <div className="row row-slider row-quality-weight">
                    <div className="label">
                        Quality weight
                        <span>
                            ({ this.props.qualityWeight } / ~{ round(normalizeNumber(weightRange, this.props.qualityWeight), 2) })
                        </span>
                    </div>
                    <Slider value={ this.props.qualityWeight } marks={ marks0to10 } tipFormatter={ null }
                        step={ 0.1 } min={ 0 } max={ 10 } onChange={ (value) => this._onSettingChange('qualityWeight', value) } />
                </div>
                <div className="row row-slider row-popularity-weight">
                    <div className="label">
                        Quality weight
                        <span>
                            ({ this.props.popularityWeight } / ~{ round(normalizeNumber(weightRange, this.props.popularityWeight), 2) })
                        </span>
                    </div>
                    <Slider value={ this.props.popularityWeight } marks={ marks0to10 } tipFormatter={ null }
                        step={ 0.1 } min={ 0 } max={ 10 } onChange={ (value) => this._onSettingChange('popularityWeight', value) } />
                </div>
                <div className="row row-slider row-maintenance-weight">
                    <div className="label">
                        Quality weight
                        <span>
                            ({ this.props.maintenanceWeight } / ~{ round(normalizeNumber(weightRange, this.props.maintenanceWeight), 2) })
                        </span>
                    </div>
                    <Slider value={ this.props.maintenanceWeight } marks={ marks0to10 } tipFormatter={ null }
                        step={ 0.1 } min={ 0 } max={ 10 } onChange={ (value) => this._onSettingChange('maintenanceWeight', value) } />
                </div>

                <div className="separator" />

                { /* ------------- Score effect slider ------------- */ }
                <div className="row row-slider row-score-effect">
                    <div className="label">Score effect <span>({ this.props.scoreEffect }) </span></div>
                    <Slider value={ this.props.scoreEffect } marks={ marks0to20 } tipFormatter={ null }
                        step={ 0.1 } min={ 0 } max={ 20 } onChange={ (value) => this._onSettingChange('scoreEffect', value) } />
                </div>

                <div className="separator" />

                { /* ------------- Boost exact checkbox ------------- */ }
                <div className="row row-boost-exact">
                    <label>
                        <input type="checkbox" name="boost-exact" checked={ this.props.boostExact }
                            onChange={ (e) => this._onSettingChange('boostExact', e.target.checked) }/>
                        <span>Make exact matches appear first</span>
                    </label>
                </div>

                { /* ------------- Reset settings ------------- */ }
                <div className="reset-settings" onClick={ () => this._onResetSettingsClick() }>Reset settings</div>
            </div>
        );
    }

    _onVisibleChange(visible) {
        this.setState({ isOpen: visible });  // eslint-disable-line react/no-set-state
    }

    _onSettingChange(property, value) {
        this.props.dispatch(update({ [property]: value }));
    }

    _onResetSettingsClick() {
        this.props.dispatch(reset());
    }
}

SearchBoxSettings.propTypes = {
    dispatch: PropTypes.func.isRequired,
    qualityWeight: PropTypes.number.isRequired,
    popularityWeight: PropTypes.number.isRequired,
    maintenanceWeight: PropTypes.number.isRequired,
    scoreEffect: PropTypes.number.isRequired,
    boostExact: PropTypes.bool.isRequired,
};

export default connect((state) => ({
    ...state.search.settings,
}))(SearchBoxSettings);

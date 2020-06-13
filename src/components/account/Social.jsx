import React, { Component } from 'react'
import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputForm from '../form/InputForm';
import { getUserProfile, updateUserSocial } from '../../actions/profileActions';
import isEmpty from '../../utils/isEmpty';
class Social extends Component {
    constructor() {
        super();
        this.state = {
            facebook: '',
            twitter: '',
            zalo: '',
            instagram: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        this.props.getUserProfile();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        if (nextProps.profile.profile) {
            if (!isEmpty(nextProps.profile.profile.social)) {
                const profile = nextProps.profile.profile.social;
                profile.facebook = !isEmpty(profile.facebook) ? profile.facebook : '';
                profile.twitter = !isEmpty(profile.twitter) ? profile.twitter : '';
                profile.zalo = !isEmpty(profile.zalo) ? profile.zalo : '';
                profile.instagram = !isEmpty(profile.instagram) ? profile.instagram : '';
                this.setState({
                    facebook: profile.facebook,
                    twitter: profile.twitter,
                    zalo: profile.zalo,
                    instagram: profile.instagram,
                });
            }
        }
    }
    onSubmit(e) {
        e.preventDefault();

        const userData = {
            facebook: this.state.facebook,
            twitter: this.state.twitter,
            zalo: this.state.zalo,
            instagram: this.state.instagram,
        }

        this.props.updateUserSocial(userData);
    }
    render() {
        const { errors } = this.state;
        const { loading } = this.props.profile;
        let submitLoading;
        if (loading) {
            submitLoading = <Spinner />
        } else {
            submitLoading = (
                <div className="save-stngs pd2">
                    <ul>
                        <li><button type="submit">Cập nhật</button></li>
                    </ul>
                </div>
            )
        }
        return (
            <div className="acc-setting">
                <h3>Thêm mạng xã hội</h3>
                <form onSubmit={this.onSubmit}>
                    
                    <InputForm
                        label="Facebook"
                        name="facebook"
                        placeholder="Facebook"
                        icon="fa fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputForm
                        label="Twitter"
                        name="twitter"
                        placeholder="Twitter"
                        icon="fa fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />
                    <InputForm
                        label="Zalo"
                        name="zalo"
                        placeholder="Số điện thoại"
                        icon="fa fa-phone"
                        value={this.state.zalo}
                        onChange={this.onChange}
                        error={errors.zalo}
                    />
                    <InputForm
                        label="Instagram"
                        name="instagram"
                        placeholder="Instagram"
                        icon="fa fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                    {submitLoading}
                </form>
            </div>
        )
    }
}
Social.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getUserProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});
export default connect(mapStateToProps, { getUserProfile, updateUserSocial })(Social);
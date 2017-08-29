import { h, Component } from 'preact';

export function withService(options) {
  const {
          service,
          mapToProps = () => ({}),
        } = options;

  return WrappedComponent => {
    const componentName = WrappedComponent.displayName || WrappedComponent.name;

    return class ServiceProvider extends Component {

      static displayName = `ServiceProvider(${componentName})`;
      static WrappedComponent = WrappedComponent;

      render(props) {
        return Promise
          .resolve(service(props))
          .then(result => <WrappedComponent {...mapToProps(result)} />)
          .catch(e => console.error(e))
      }
    }
  };
};

import UU5 from "uu5g04";
import UuIsa from "uu_isa_maing01-hi";

const { shallow } = UU5.Test.Tools;

describe(`UuIsa.Bricks.Area.AreaDetail`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuIsa.Bricks.Area.AreaDetail />);
    expect(wrapper).toMatchSnapshot();
  });
});

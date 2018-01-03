import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactDataGridContextMenu from '../ContextMenu';
import {ContextMenu} from '@cristian77/react-contextmenu';

describe('Context Menu', () => {
  let component = {};

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<ReactDataGridContextMenu />);
  });

  it('should create a new ContextMenu instance', () => {
    expect(component).toBeDefined();
  });

  it('should have "reactDataGridContextMenu" as identifier', () => {
    let contextMenu = TestUtils.findRenderedComponentWithType(component, ContextMenu);
    expect(contextMenu.props.identifier).toEqual('reactDataGridContextMenu');
  });
});

import React, { Component } from "react";
import { Switch, Collapse, Table, Icon } from "antd";

const Panel = Collapse.Panel;
const { Column, ColumnGroup } = Table;

export default class Station extends Component {
  render() {
    const { station, arrivals, toggleFavourite, isFavourited } = this.props;
    const { commonName } = station;
    return (
      <div className="station">
        <div className="station__header">
          <h1 className="station__heading">
            {commonName.slice(0, commonName.indexOf("Underground Station"))}
          </h1>
          <Switch
            checked={isFavourited}
            onChange={() => toggleFavourite(station)}
            unCheckedChildren={<Icon type="star" theme="filled" />}
            checkedChildren={<Icon type="delete" theme="filled" />}
          />
        </div>
        <Collapse className="station__accordion" accordion>
          {Object.entries(arrivals).map(([line, platforms]) => (
            <Panel header={line} key={line}>
              {Object.entries(platforms).map(
                ([platform, correspondingArrivals]) => (
                  <Table
                    rowKey="vehicleId"
                    key={platform}
                    dataSource={correspondingArrivals
                      .sort((a, b) => a.timeToStation - b.timeToStation)
                      .map(arrival => ({
                        timeToStation: `${Math.floor(
                          arrival.timeToStation / 60
                        )} min ${arrival.timeToStation % 60} sec`,
                        towards: arrival.towards,
                        key: `${arrival.vehicleId}-${arrival.timeToStation}`
                      }))}
                    pagination={false}
                  >
                    <ColumnGroup title={<h3>{platform}</h3>}>
                      <Column
                        title="Towards"
                        key="towards"
                        dataIndex="towards"
                      />
                      <Column
                        title="Expected arrival"
                        key="expected arrival"
                        dataIndex="timeToStation"
                      />
                    </ColumnGroup>
                  </Table>
                )
              )}
            </Panel>
          ))}
        </Collapse>
      </div>
    );
  }
}

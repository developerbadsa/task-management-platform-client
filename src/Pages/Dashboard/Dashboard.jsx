import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { RxHome } from 'react-icons/rx';



const Dashboard = () => {
      return (
            <div>
                  <div className="lg:flex">
                        {/* Sidebar */}
                        <nav className="lg:w-82 lg:flex-shrink-0 border-r lg:left-0 lg:bottom-0 lg:flex lg:flex-col lg:dark:bg-gray-900 lg:text-green-gray-900 lg:z-50 ">
                              <div className="pb-6 mt-1 lg:mt-3 overflow-x-hidden overflow-y-auto">
                                    {/* <p className="px-6 py-2 text-2xl font-bold ">{isHR && <span>HR </span>}{isEmployee && <span>Employee </span>}{isAdmin && <span>Admin </span>} Dashboard</p> */}
                                    <ul className="mb-0 text-sm">
                                          <li className="flex items-center group  dark:hover:bg-gray-800">
                                                <NavLink
                                                      to='/dashboard/create-task'
                                                      className={({ isActive, isPending }) =>
                                                            isPending ? "text-red-400" : isActive ? "text-green-400 w-full bg-gray-800 px-6 py-4" : " px-6 py-4 "
                                                      }
                                                >
                                                      <div className="flex items-center gap-2">Create New Task</div>
                                                </NavLink>
                                          </li>
                                          <li className="flex items-center group  dark:hover:bg-gray-800">
                                                <NavLink
                                                      to='/dashboard/profile'
                                                      className={({ isActive, isPending }) =>
                                                            isPending ? "text-red-400" : isActive ? "text-green-400 w-full bg-gray-800 px-6 py-4" : " px-6 py-4 "
                                                      }
                                                >
                                                      <div className="flex items-center gap-2">Profile</div>
                                                </NavLink>
                                          </li>
                                    </ul>
                              </div>
                        </nav>

                        {/* Main Content */}
                        <div className="lg:flex-1 lg:mx-auto lg:content-wrapper">

                              <section className="py-3 w-full">
                                    <div className="container px-3 mx-auto ">
                                          <div className="overflow-x-auto rounded border shadow dark:bg-gray-900 bg-gray-50">


                                                <Outlet></Outlet>
                                          </div>

                                    </div>
                              </section>
                        </div>
                  </div>
            </div>
      );
};

export default Dashboard;
package com.djiapp.konsolasterujaca;

import android.Manifest;
import android.app.Activity;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.TextView;
import android.widget.ToggleButton;


import java.util.Timer;
import java.util.TimerTask;


import dji.common.error.DJIError;

import dji.common.flightcontroller.FlightControllerState;
import dji.common.flightcontroller.virtualstick.FlightControlData;
import dji.common.flightcontroller.virtualstick.FlightCoordinateSystem;
import dji.common.flightcontroller.virtualstick.RollPitchControlMode;
import dji.common.flightcontroller.virtualstick.VerticalControlMode;
import dji.common.flightcontroller.virtualstick.YawControlMode;

import dji.common.util.CommonCallbacks;

import dji.sdk.flightcontroller.FlightController;

public class MainActivity extends Activity implements View.OnClickListener {


    //////Sensor
    private SensorManager sensorManager;
    private Sensor rotationSensor;
    private SensorEventListener rotationEventListener;


    private FlightController mFlightController;
    protected TextView mConnectStatusTextView;
    private Button mBtnEnableVirtualStick;
    private Button mBtnDisableVirtualStick;
    private ToggleButton mBtnMotors;
    private Button mBtnTakeOff;
    private Button mBtnLand;

    private TextView mTextView;
    
    private OnScreenJoystick mScreenJoystickLeft;

    private Timer mSendVirtualStickDataTimer;
    private SendVirtualStickDataTask mSendVirtualStickDataTask;

    private float startPitch = 0;
    private float startRoll = 0;

    private float droneYaw;

    private float mPitch;
    private float mRoll;
    private float mYaw;
    private float mThrottle;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        sensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);
        rotationSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR);
        rotationEventListener = new SensorEventListener() {

            float[] rotMat = new float[9];
            float[] values = new float[3];
            @Override
            public void onSensorChanged(SensorEvent event) {

                if (event.sensor.getType() == Sensor.TYPE_ROTATION_VECTOR) {
                    SensorManager.getRotationMatrixFromVector(rotMat,
                            event.values);
                    SensorManager
                            .remapCoordinateSystem(rotMat,
                                    SensorManager.AXIS_X, SensorManager.AXIS_Y,
                                    rotMat);
                    SensorManager.getOrientation(rotMat, values);

                    if (mFlightController != null) {
                        mFlightController.setStateCallback(
                                new FlightControllerState.Callback() {
                                    @Override
                                    public void onUpdate(FlightControllerState
                                                                 djiFlightControllerCurrentState){
                                        droneYaw = (float)Math.toRadians(djiFlightControllerCurrentState.getAttitude().yaw);
                                    }
                                }
                        );
                    }

                    if (startPitch == 0 && startRoll == 0) {
                        startPitch = values[2];
                        startRoll = values[1];
                    }

                    float pitch = values[2] - startPitch;
                    float roll = values[1] - startRoll;
                    float yaw = values[0] - droneYaw;

                    mTextView.setText("Przechylenie: " + Math.round(Math.toDegrees(pitch)) +
                            ", Pochylenie: " + Math.round(Math.toDegrees(roll)) + ", Azymut: "
                            + Math.round(Math.toDegrees(yaw)));

                    if (Math.abs(pitch) < 0.1) {
                        pitch = 0;
                    }
                    if (Math.abs(roll) < 0.1) {
                        roll = 0;
                    }
                    if (Math.abs(yaw) < 0.1) {
                        yaw = 0;
                    }
                    float pitchControlMaxSpeed = 20;
                    float rollControlMaxSpeed = 20;
                    float yawControlMaxSpeed = 100;

                    mYaw = (float) (yawControlMaxSpeed * yaw);
                    if (pitch>=0) mPitch = (float) (pitchControlMaxSpeed * pitch* pitch);
                    else mPitch = (float) (pitchControlMaxSpeed * pitch* pitch * -1);
                    if (roll>=0) mRoll = (float) (rollControlMaxSpeed * roll* roll);
                    else mRoll = (float) (rollControlMaxSpeed * roll * roll * -1);

                    if (null == mSendVirtualStickDataTimer) {
                        mSendVirtualStickDataTask = new SendVirtualStickDataTask();
                        mSendVirtualStickDataTimer = new Timer();
                        mSendVirtualStickDataTimer.schedule(mSendVirtualStickDataTask, 100, 200);
                    }

                }
            }
            @Override
            public void onAccuracyChanged(Sensor sensor, int accuracy) {

            }
        };

        initUI();

    }



    @Override
    public void onResume() {
        Log.e(TAG, "onResume");
        super.onResume();
        //////Sensor
        sensorManager.registerListener(rotationEventListener, rotationSensor, SensorManager.SENSOR_DELAY_GAME);
        /////Sensor
        initFlightController();
    }

    @Override
    public void onPause() {
        Log.e(TAG, "onPause");
        super.onPause();
        /////Sensor
        sensorManager.unregisterListener(rotationEventListener);
        /////Sensor
    }

    @Override
    public void onStop() {
        Log.e(TAG, "onStop");
        super.onStop();
        sensorManager.unregisterListener(rotationEventListener);
    }

    public void onReturn(View view){
        Log.e(TAG, "onReturn");
        this.finish();
    }

    @Override
    protected void onDestroy() {
        Log.e(TAG, "onDestroy");
        if (null != mSendVirtualStickDataTimer) {
            mSendVirtualStickDataTask.cancel();
            mSendVirtualStickDataTask = null;
            mSendVirtualStickDataTimer.cancel();
            mSendVirtualStickDataTimer.purge();
            mSendVirtualStickDataTimer = null;
        }
        super.onDestroy();
    }

    private void initFlightController() {


        if (aircraft == null || !aircraft.isConnected()) {
            showToast("Rozlaczono");
            mFlightController = null;
            return;
        } else {
            mFlightController = aircraft.getFlightController();
            mFlightController.setRollPitchControlMode(RollPitchControlMode.VELOCITY);
            mFlightController.setYawControlMode(YawControlMode.ANGULAR_VELOCITY);
            mFlightController.setVerticalControlMode(VerticalControlMode.VELOCITY);
            mFlightController.setRollPitchCoordinateSystem(FlightCoordinateSystem.BODY);
        }
    }

    private void initUI() {

        mBtnEnableVirtualStick = (Button) findViewById(R.id.btn_enable_virtual_stick);
        mBtnDisableVirtualStick = (Button) findViewById(R.id.btn_disable_virtual_stick);
        mBtnTakeOff = (Button) findViewById(R.id.btn_take_off);
        mBtnLand = (Button) findViewById(R.id.btn_land);
        mBtnMotors = (ToggleButton) findViewById(R.id.btn_start_motors);
        mTextView = (TextView) findViewById(R.id.textview_motors);
        mConnectStatusTextView = (TextView) findViewById(R.id.ConnectStatusTextView);
        mScreenJoystickLeft = (OnScreenJoystick)findViewById(R.id.directionJoystickLeft);

        mBtnEnableVirtualStick.setOnClickListener(this);
        mBtnDisableVirtualStick.setOnClickListener(this);
        mBtnTakeOff.setOnClickListener(this);
        mBtnLand.setOnClickListener(this);

        mBtnMotors.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (isChecked) {

                    mTextView.setVisibility(View.VISIBLE);

                    if (mFlightController != null) {


                        mFlightController.turnOnMotors( new CommonCallbacks.CompletionCallback() {
                            @Override
                            public void onResult(DJIError djiError) {
                                if (djiError != null){
                                    showToast(djiError.getDescription());
                                }else
                                {
                                    showToast("Silniki wlaczone");
                                }
                            }
                        });
                    }

                } else {

                    mTextView.setVisibility(View.INVISIBLE);

                    if (mFlightController != null) {
                        mFlightController.turnOffMotors( new CommonCallbacks.CompletionCallback() {
                            @Override
                            public void onResult(DJIError djiError) {
                                if (djiError != null){
                                    showToast(djiError.getDescription());
                                }else
                                {
                                    showToast("Silniki wylaczone");
                                }
                            }
                        });
                    }
                }
            }
        });

        mScreenJoystickLeft.setJoystickListener(new OnScreenJoystickListener() {

           @Override
            public void onTouch(OnScreenJoystick joystick, float pX, float pY) {

                if(Math.abs(pY) < 0.02 ){
                    pY = 0;
                }
                float verticalJoyControlMaxSpeed = 2;
                mThrottle = (verticalJoyControlMaxSpeed * pY);
            }
        });
    }

    @Override
    public void onClick(View v) {

        switch (v.getId()) {
            case R.id.btn_enable_virtual_stick:
                if (mFlightController != null){

                    mFlightController.setVirtualStickModeEnabled(true, new CommonCallbacks.CompletionCallback() {
                        @Override
                        public void onResult(DJIError djiError) {
                            if (djiError != null){
                                showToast(djiError.getDescription());
                            }else
                            {
                                startPitch = 0;
                                startRoll = 0;
                                showToast("Sterowanie wlaczone");
                            }
                        }
                    });

                }
                break;

            case R.id.btn_disable_virtual_stick:

                if (mFlightController != null){
                    mFlightController.setVirtualStickModeEnabled(false, new CommonCallbacks.CompletionCallback() {
                        @Override
                        public void onResult(DJIError djiError) {

                            if (djiError != null) {
                                showToast(djiError.getDescription());
                            } else {
                                showToast("Sterowanie wylaczone");
                            }
                        }
                    });
                }
                break;

            case R.id.btn_take_off:
                if (mFlightController != null){
                    mFlightController.startTakeoff(
                            new CommonCallbacks.CompletionCallback() {
                                @Override
                                public void onResult(DJIError djiError) {
                                    if (djiError != null) {
                                        showToast(djiError.getDescription());
                                    } else {
                                        startPitch = 0;
                                        startRoll = 0;
                                        showToast("Wznoszenie rozpoczete");
                                    }
                                }
                            }
                    );
                }

                break;

            case R.id.btn_land:
                if (mFlightController != null){

                    mFlightController.startLanding(
                            new CommonCallbacks.CompletionCallback() {
                                @Override
                                public void onResult(DJIError djiError) {
                                    if (djiError != null) {
                                        showToast(djiError.getDescription());
                                    } else {
                                        showToast("Rozpoczeto ladowanie");
                                    }
                                }
                            }
                    );
                }
            case R.id.btn_land2:
                if (mFlightController != null){

                    mFlightController.confirmLanding(
                            new CommonCallbacks.CompletionCallback() {
                                @Override
                                public void onResult(DJIError djiError) {
                                    if (djiError != null) {
                                        showToast(djiError.getDescription());
                                    } else {
                                        showToast("Ladowanie potwierdzone");
                                    }
                                }
                            }
                    );
                }

                break;

            default:
                break;
        }
    }

    class SendVirtualStickDataTask extends TimerTask {

        @Override
        public void run() {

            if (mFlightController != null) {
                mFlightController.sendVirtualStickFlightControlData(
                        new FlightControlData(
                                mPitch, mRoll, mYaw, mThrottle
                        ), new CommonCallbacks.CompletionCallback() {
                            @Override
                            public void onResult(DJIError djiError) {

                            }
                        }
                );
            }
        }
    }
}
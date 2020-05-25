(async () => {
    await MobroSDK.init();

    let data = await MobroSDK.emit("monitor:sensor:data", "general_processor_usage");

    MobroSDK.addChannelListener("amd_50_years_cpu_fan_rpm", (data) => {
        console.log(data.payload);
    });

    console.log(data);
})();